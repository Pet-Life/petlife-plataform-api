const Sale = require('../models/Sale');
const Product = require('../models/Product');
const Payment = require('../models/Payment');
const Shop = require('../models/Shop');
const Consumer = require('../models/Consumer');

class SaleController {
  async getAll(req, res) {
    const sale = await Sale.findAll({
      attributes: {
        exclude: ['productId', 'shopId', 'consumerId', 'paymentId'],
      },
      include: [
        { association: 'products' },
        { association: 'shops', attributes: { exclude: ['password'] } },
        { association: 'consumers', attributes: { exclude: ['password'] } },
        { association: 'payments' },
      ],
    });

    try {
      if (!sale) {
        return res
          .status(400)
          .json({ success: false, error: 'error loading sales' });
      }

      return res
        .status(200)
        .json({ success: true, message: 'list of sales', sales: sale });
    } catch (err) {
      return res.status({
        success: false,
        message: 'error loading sales',
        error: err,
      });
    }
  }

  async create(req, res) {
    const { productId, priceTotal, shopId, paymentId } = req.body;
    const { id } = req.headers;

    const product = await Product.findByPk(productId);

    if (!product) {
      return res
        .status(400)
        .json({ success: false, error: 'product not found' });
    }

    const shop = await Shop.findByPk(shopId);

    if (!shop) {
      return res.status(400).json({ success: false, error: 'shop not found' });
    }

    const payment = await Payment.findByPk(paymentId);

    if (!payment) {
      return res
        .status(400)
        .json({ success: false, error: 'type payment not found' });
    }

    const consumer = await Consumer.findByPk(id);

    if (!consumer) {
      return res
        .status(400)
        .json({ success: false, error: 'consumer not found' });
    }

    const sale = await Sale.create({
      productId: product.id,
      priceTotal,
      shopId: shop.id,
      consumerId: consumer.id,
      paymentId: payment.id,
    });

    return res
      .status(201)
      .json({ success: true, message: 'create new sale', sale });
  }
}

module.exports = new SaleController();
