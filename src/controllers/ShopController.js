const dotenv = require('dotenv');
const Shop = require('../models/Shop');
const apiTomTom = require('../services/tomtom/api');

dotenv.config();

const { KEY_API_TOMTOM } = process.env;

class ShopController {
  async getById(req, res) {
    const { id } = req.headers;

    try {
      const shop = await Shop.findByPk(id, {
        attributes: { exclude: ['password'] },
        include: [{ association: 'products' }],
      });

      return res.status(200).json({ success: true, shop });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, message: 'error find shop' });
    }
  }

  async create(req, res) {
    const { name, cnpj, zipcode, email, password } = req.body;

    const response = await apiTomTom.get(
      `${zipcode}.json?limit=1&countrySet=BR&territory=BRA&language=pt-BR&extendedPostalCodesFor=PAD&key=${KEY_API_TOMTOM}`
    );

    const [{ address, position }] = response.data.results;

    const point = { type: 'Point', coordinates: [position.lat, position.lon] };

    await Shop.create({
      name,
      cnpj,
      email,
      password,
      zipcode,
      permissionLevel: 2,
      avatar: 'http://127.0.0.1:5000/files/shop-logo.png',
      phone: '(00)0000-0000',
      deliveryType: [null],
      businessHours: [null],
      street: address.streetName,
      district: address.municipalitySubdivision,
      city: address.municipality,
      state: address.countrySubdivision,
      coordinates: point,
      status: 'ativo',
    })
      .then((shop) => {
        shop.password = undefined;

        return res
          .status(201)
          .json({ success: true, message: 'created new shop', shop });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: 'error created user shop',
          error: err,
        });
      });
  }
}

module.exports = new ShopController();
