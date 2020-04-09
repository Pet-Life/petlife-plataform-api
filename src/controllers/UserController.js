const User = require('../models/User');

class UserController {
  static async create(req, res) {
    const { firstName, lastName, email, password, permissionLevel } = req.body;

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      permissionLevel,
    });

    return res
      .status(201)
      .json({ success: true, message: 'created new user', user });
  }
}

module.exports = UserController;
