const Consumer = require('../models/Consumer');

class SessionController {
  async login(req, res) {
    const { email, password } = req.body;

    const consumer = await Consumer.findOne({
      where: { email },
    });

    console.log(consumer);

    if (!consumer) {
      return res
        .status(400)
        .json({ success: false, message: 'consumer not found' });
    }

    if (consumer.validatePassword(password)) {
      consumer.password = undefined;
      return res.status(200).json({ success: true, message: 'ok', consumer });
    }

    return res.status(500).json({ success: false, message: 'error login' });
  }
}

module.exports = new SessionController();
