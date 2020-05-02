const Sequelize = require('sequelize');
const dotenv = require('dotenv');
const Shop = require('../models/Shop');
const apiTomTom = require('../services/tomtom/api');
const apiViaCep = require('../services/viacep/api');

dotenv.config();

const { KEY_API_TOMTOM } = process.env;

class SearchController {
  async getAll(req, res) {
    const { zipcode } = req.body;

    const response = await apiViaCep.get(`${zipcode}/json`);

    const { logradouro, bairro, complemento, localidade, uf } = response.data;

    const responseData = await apiTomTom.get(
      `${zipcode}.json?limit=1&countrySet=BR&territory=BRA&language=pt-BR&extendedPostalCodesFor=PAD&key=${KEY_API_TOMTOM}`
    );

    const [{ position }] = responseData.data.results;

    const address = {
      address: {
        street: logradouro,
        complement: complemento,
        district: bairro,
        city: localidade,
        state: uf,
      },
      coordinates: {
        latitude: position.lat,
        longitude: position.lon,
      },
    };

    const shops = await Shop.findAll({
      attributes: {
        exclude: ['password'],
        include: [
          [
            Sequelize.fn(
              'ST_DistanceSphere',
              Sequelize.fn(
                'ST_MakePoint',
                address.coordinates.latitude,
                address.coordinates.latitude
              ),
              Sequelize.col('coordinates')
            ),
            'coordinates',
          ],
        ],
      },
      include: [{ association: 'products' }],
      where: Sequelize.where(
        Sequelize.fn(
          'ST_DistanceSphere',
          Sequelize.fn(
            'ST_MakePoint',
            address.coordinates.latitude,
            address.coordinates.longitude
          ),
          Sequelize.col('coordinates')
        ),
        '<=',
        10000
      ),
    });

    return res
      .status(200)
      .json({ success: true, message: 'list of shops', shops });
  }
}

module.exports = new SearchController();
