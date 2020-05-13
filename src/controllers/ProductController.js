const Product = require('../models/Product');
const Shop = require('../models/Shop');

class ProductController {
  async getAll(req, res) {
    const { id } = req.body;
    const products = await Product.findAll({
      where: {
        shopId: id,
      },
      include: [
        { association: 'categories' },
        { association: 'shops', attributes: { exclude: ['password'] } },
      ],
    });

    return res
      .status(200)
      .json({ success: true, message: 'list of products', products });
  }

  async getById(req, res) {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: 'product not found' });
    }

    return res
      .status(200)
      .json({ success: true, message: 'product found', product });
  }

  async create(req, res) {
    const { filename } = req.file;
    const {
      name,
      description,
      manufacturer,
      unityPrice,
      quantity,
      categoryId,
      status,
    } = req.body;
    const { id } = req.user;

    console.log(id);

    const shop = await Shop.findByPk(id);

    if (!shop) {
      return res
        .status(400)
        .json({ success: false, error: 'shop does not exists' });
    }

    const product = await Product.create(
      {
        photo: filename,
        name,
        description,
        manufacturer,
        unityPrice,
        quantity,
        categoryId,
        status,
        shopId: id,
      },
      {
        include: [
          { association: 'categories' },
          { association: 'shops', attributes: { exclude: ['password'] } },
        ],
      }
    );

    return res
      .status(201)
      .json({ success: true, message: 'create new product', product });
  }

  async update(req, res) {
    const { id } = req.params;
    const { newQuantity } = req.body;

    try {
      const product = await Product.findByPk(id);

      if (!product) {
        return res
          .status(400)
          .json({ success: false, message: 'product not found' });
      }

      await product.update(
        { quantity: newQuantity },
        { where: { id: product.id } }
      );

      return res
        .status(200)
        .json({ success: true, message: 'updated product', product });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'error updating product',
        error: err,
      });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const product = await Product.findByPk(id);

      if (!product) {
        return res
          .status(400)
          .json({ success: false, message: 'product not found' });
      }

      await Product.destroy({ where: { id: product.id } });

      return res
        .status(200)
        .json({ success: true, message: 'product successfully deleted' });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, message: 'error deleting product', err });
    }
  }
}

module.exports = new ProductController();
