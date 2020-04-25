const dotenv = require('dotenv');
const Shop = require('../models/Shop');
const apiTomTom = require('../services/tomtom/api');

dotenv.config();

const { KEY_API_TOMTOM } = process.env;

class ShopController {
  async create(req, res) {
    const {
      firstName,
      lastName,
      email,
      password,
      cnpj,
      phone,
      deliveryType,
      businessHours,
      zipcode,
      number,
    } = req.body;

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

    const point = { type: 'Point', coordinates: [position.lat, position.lon] };

    await Shop.create({
      firstName,
      lastName,
      email,
      password,
      permissionLevel: 2,
      avatar: 'https://i.imgur.com/L1RTiiC.png',
      cnpj,
      phone,
      deliveryType,
      businessHours,
      street: address.streetName,
      number,
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
