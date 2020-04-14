const Shop = require('../models/Shop');

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
    } = req.body;

    console.log(firstName);

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
