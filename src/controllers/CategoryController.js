const Category = require('../models/Category');

class CategoryController {
  async getAll(req, res) {
    await Category.findAll()
      .then((category) => {
        return res.status(200).json({
          success: true,
          message: 'list of categories',
          categories: category,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          success: false,
          message: 'error loading list of categories',
          error: err,
        });
      });
  }

  async getById(req, res) {
    const { id } = req.params;

    await Category.findByPk(id)
      .then((category) => {
        if (!category) {
          return res
            .status(400)
            .json({ success: false, error: 'category not found' });
        }

        return res
          .status(200)
          .json({ success: true, message: 'category found', category });
      })
      .catch((err) => {
        return res.status(500).json({
          success: false,
          message: 'error loading category',
          error: err,
        });
      });
  }

  async create(req, res) {
    const { name } = req.body;

    await Category.create({ name })
      .then((category) => {
        if (!category) {
          return res
            .status(400)
            .json({ success: false, error: 'this field cannot be empty' });
        }

        return res
          .status(201)
          .json({ success: true, message: 'created new category', category });
      })
      .catch((err) => {
        return res.status(500).json({
          success: false,
          message: 'error when creating new category',
          err,
        });
      });
  }
}

module.exports = new CategoryController();
