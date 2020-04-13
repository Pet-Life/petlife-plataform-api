const Consumer = require('../models/Consumer');

class ConsumerController {
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
        console.log(err);
        return res.status(500).json({
          success: false,
          message: 'error create new consumer',
          error: err,
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
      });
  }
}

module.exports = new ConsumerController();
