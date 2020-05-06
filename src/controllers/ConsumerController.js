const bcrypt = require('bcrypt');
const Consumer = require('../models/Consumer');

class ConsumerController {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        return res
          .status(400)
          .json({ success: false, message: 'fields cannot be empty' });
      }

      const consumer = await Consumer.findOne({ where: { email } });

      if (!consumer) {
        return res
          .status(400)
          .json({ success: false, message: 'consumer not found' });
      }

      if (await bcrypt.compareSync(password, consumer.password)) {
        return res.status(200).json({
          success: true,
          message: 'login successfully',
          consumerId: consumer.id,
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

    const consumer = await Consumer.findByPk(id, {
      include: [{ association: 'adresses' }],
      attributes: { exclude: ['password'] },
    });

    if (!consumer) {
      return res
        .status(400)
        .json({ success: false, message: 'consumer not found' });
    }

    return res
      .status(200)
      .json({ success: true, message: 'consumer found', consumer });
  }

  async create(req, res) {
    const { firstName, lastName, email, password } = req.body;
    await Consumer.create({
      firstName,
      lastName,
      email,
      password,
      permissionLevel: 1,
      avatar: 'http://127.0.0.1:5000/files/avatar-consumer.png',
      cpf: '000.000.000-00',
      phone: '(00)00000-0000',
    })
      .then((consumer) => {
        consumer.password = undefined;
        return res.json({
          success: true,
          message: 'created new user consumer',
          consumer,
        });
      })
      .catch((err) => {
        return res.status(200).json({
          success: false,
          message: 'E-mail already registered',
          error: err,
        });
      })
      .catch((err) => {
        return res.status(200).json({
          success: false,
          message: 'error create new user',
          error: err,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          success: false,
          message: 'the fields cannot be empty',
          error: err,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: 'error create new consumer',
          error: err,
        });
      });
  }
}

module.exports = new ConsumerController();
