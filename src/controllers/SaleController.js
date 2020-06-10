const Sale = require('../models/Sale');

class SaleController {
  async getAll(req, res) {
    const sales = await Sale.findAll({
      include: [
        { association: 'salesShop', attributes: { exclude: ['password'] } },
        { association: 'salesConsumer', attributes: { exclude: ['password'] } },
      ],
    });

    return res
      .status(200)
      .json({ success: true, message: 'list of products', sales });
  }

  async create(req, res) {
    const { id } = req.params;
    const { products, priceTotal, idConsumer } = req.body;

    try {
      const sale = await Sale.create({
        products,
        priceTotal,
        idShop: id,
        idConsumer,
      });

      return res
        .status(201)
        .json({ success: true, message: 'created new sale', sale });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, message: 'error create new sale', err });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const sale = await Sale.findByPk(id);

      if (!sale) {
        return res
          .status(400)
          .json({ success: false, message: 'sale not found' });
      }

      await Sale.destroy({ where: { id: sale.id } });

      return res
        .status(200)
        .json({ success: true, message: 'sale successfully deleted' });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, message: 'error deleting sale', err });
    }
  }
}

module.exports = new SaleController();
