const Consumer = require('../models/Consumer');

class ConsumerController {
  async getAll(req, res) {
    await Consumer.findAll()
      .then((consumer) => {
        return res.status(200).json({
          success: true,
          message: 'list of all consumers',
          consumers: consumer,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          success: false,
          message: 'error loading consumers',
          error: err,
        });
      });
  }

  async create(req, res) {
    const { firstName, lastName, email, password } = req.body;
    await Consumer.create({
      firstName,
      lastName,
      email,
      password,
      permissionLevel: 1,
      avatar: 'https://i.imgur.com/L1RTiiC.png',
      cpf: '00000000000',
      phone: '00000000000',
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
