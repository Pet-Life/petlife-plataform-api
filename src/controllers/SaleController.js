const Sale = require('../models/Sale');
const Product = require('../models/Product');
// const Payment = require('../models/Payment');
// const Shop = require('../models/Shop');
// const Consumer = require('../models/Consumer');

class SaleController {
  async create(req, res) {
    const { productId, priceTotal, shopId, paymentId } = req.body;
    const { id } = req.headers;

    const product = await Product.findByPk(productId);

    if (!product) {
      return res
        .status(400)
        .json({ success: false, error: 'product not found' });
    }

    const sale = await Sale.create({
      productId,
      priceTotal,
      shopId,
      consumerId: id,
      paymentId,
    });

    return res
      .status(201)
      .json({ success: true, message: 'create new sale', sale });
  }
}

module.exports = new SaleController();
