const dotenv = require('dotenv');
const Consumer = require('../models/Consumer');
const Address = require('../models/Address');
const apiTomTom = require('../services/tomtom/api');

dotenv.config();

const { KEY_API_TOMTOM } = process.env;

class AddressController {
  async getById(req, res) {
    const { id } = req.params;

    try {
      const user = await Consumer.findByPk(id, {
        include: [{ association: 'adresses' }],
      });

      if (!user) {
        return res
          .status(400)
          .json({ success: false, error: 'user not found' });
      }

      return res.status(200).json({
        success: true,
        message: 'user addresses',
        user: user.adresses,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'error loading adresses',
        error: err,
      });
    }
  }

  async create(req, res) {
    const { id } = req.params;
    const { zipcode, number } = req.body;

    const response = await apiTomTom.get(
      `${zipcode}.json?limit=1&countrySet=BR&territory=BRA&language=pt-BR&extendedPostalCodesFor=PAD&key=${KEY_API_TOMTOM}`
    );

    const [{ address, position }] = response.data.results;

    console.log(
      address.streetName,
      number,
      address.municipalitySubdivision,
      address.municipality,
      address.countrySubdivision,
      zipcode,
      position.lat,
      position.lon
    );

    const consumer = await Consumer.findByPk(id);

    if (!consumer) {
      return res.status(400).json({ success: false, error: 'User not found' });
    }

    try {
      const newAddress = await Address.create({
        zipcode,
        street: address.streetName,
        number,
        complement: '',
        district: address.municipalitySubdivision,
        city: address.municipality,
        state: address.countrySubdivision,
        coordinates: [position.lat, position.lon],
        consumerId: id,
      });

      return res.status(201).json({
        success: true,
        message: 'create new address',
        address: newAddress,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'error create new address',
        error: err,
      });
    }
  }
}

module.exports = new AddressController();
