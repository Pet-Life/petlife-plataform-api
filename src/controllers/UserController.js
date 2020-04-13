const User = require('../models/User');
const ConsumerController = require('./ConsumerController');

class UserController {
  static async create(req, res) {
    const { firstName, lastName, email, password } = req.body;

    await User.create({
      firstName,
      lastName,
      email,
      password,
      permissionLevel: 1,
    })
      .then((user) => {
        user.password = undefined;

        const consumer = new ConsumerController(user.id);

        consumer.create();

        return res
          .status(201)
          .json({ success: true, message: 'created new user', user });
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

module.exports = UserController;
