const Product = require('../models/Product');
const Shop = require('../models/Shop');

class ProductController {
  async getAll(req, res) {
    const products = await Product.findAll({
      include: [
        { association: 'categories' },
        { association: 'shops', attributes: { exclude: ['password'] } },
      ],
    });

    return res
      .status(200)
      .json({ success: true, message: 'list of products', products });
  }

  async create(req, res) {
    const { filename } = req.file;
    const {
      name,
      manufacturer,
      unityPrice,
      quantity,
      categoryId,
      status,
    } = req.body;
    const { id } = req.headers;

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
}

module.exports = new ProductController();
