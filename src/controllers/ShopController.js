const dotenv = require('dotenv');
const Shop = require('../models/Shop');
const apiTomTom = require('../services/tomtom/api');

dotenv.config();

const { KEY_API_TOMTOM } = process.env;

class ShopController {
  async login(req, res) {
    const { email, password } = req.body;

    console.log(password);

    await Shop.findOne({ where: { email } }).then((shop) => {
      if (shop.validPassword(password)) {
        return res.status(200).json({ success: true, shop });
      }

      return res
        .status(400)
        .json({ success: false, message: 'password invalid' });
    });
  }

  async getById(req, res) {
    const { id } = req.headers;

    try {
      const shop = await Shop.findByPk(id, {
        attributes: { exclude: ['password'] },
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

    console.log(
      address.streetName,

      address.municipalitySubdivision,
      address.municipality,
      address.countrySubdivision,
      zipcode,
      position.lat,
      position.lon
    );

    const point = { type: 'Point', coordinates: [position.lat, position.lon] };

    await Shop.create({
      name,
      cnpj,
      email,
      password,
      zipcode,
      permissionLevel: 2,
      avatar: 'https://i.imgur.com/L1RTiiC.png',
      phone: '(00) 0000-0000',
      deliveryType: [' '],
      businessHours: [' '],
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
