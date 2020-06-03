const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Shop = require('../models/Shop');
const apiTomTom = require('../services/tomtom/api');

dotenv.config();

const { SECRET, KEY_API_TOMTOM } = process.env;

class ShopController {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        return res
          .status(400)
          .json({ success: false, message: 'fields cannot be empty' });
      }

      const shop = await Shop.findOne({
        where: { email },
        include: [{ association: 'products' }],
      });

      if (!shop) {
        return res
          .status(400)
          .json({ success: false, message: 'shop not found' });
      }

      if (await bcrypt.compareSync(password, shop.password)) {
        const token = jwt.sign({ user: shop }, SECRET, { expiresIn: 3600 });
        shop.password = undefined;
        return res.status(200).json({
          success: true,
          message: 'login successfully',
          shop,
          token,
        });
      }

      return res
        .status(400)
        .json({ success: false, message: 'password invalid' });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, message: 'error when signing in' });
    }
  }

  async getById(req, res) {
    const { id } = req.params;

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
      avatar: 'http://127.0.0.1:5000/files/logo.png',
      phone: '(00)0000-0000',
      deliveryType: ['entrega'],
      businessHours: ['Segunda a Sexta das 09:00h às 18:00h'],
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
