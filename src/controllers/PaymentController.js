const Payment = require('../models/Payment');

class PaymentController {
  async getAll(req, res) {
    await Payment.findAll()
      .then((payment) => {
        return res.status(200).json({
          success: true,
          message: 'list of all types of payments',
          payments: payment,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          success: false,
          message: 'error loading payment types',
          error: err,
        });
      });
  }

  async getById(req, res) {
    const { id } = req.params;

    await Payment.findByPk(id)
      .then((payment) => {
        if (!payment) {
          return res.status(400).json({
            success: false,
            error: 'payment type not found',
          });
        }

        return res
          .status(200)
          .json({ success: true, message: 'type of payment found', payment });
      })
      .catch((err) => {
        return res.status(500).json({
          success: false,
          message: 'error when loading payment type',
          error: err,
        });
      });
  }

  async getByName(req, res) {
    const { name } = req.query;

    await Payment.findOne({ where: { name } })
      .then((payment) => {
        if (!payment) {
          return res
            .status(400)
            .json({ success: false, message: 'payment type not found' });
        }
        return res
          .status(200)
          .json({ success: true, message: 'type of payment found', payment });
      })
      .catch((err) => {
        return res
          .status(500)
          .json({ success: false, message: 'error loading payment type', err });
      });
  }

  async create(req, res) {
    const { name } = req.body;

    await Payment.create({ name })
      .then((payment) => {
        return res.status(201).json({
          success: true,
          message: 'created new type payment',
          payment,
        });
      })
      .catch((err) => {
        if (!name) {
          return res.status(400).json({
            success: false,
            message: 'this field cannot be empty',
            error: err,
          });
        }

        return res.status(500).json({
          success: false,
          message: 'error created new type payment',
          error: err,
        });
      });
  }
}

module.exports = new PaymentController();
