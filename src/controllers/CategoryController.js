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

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const category = await Category.findByPk(id);

      if (!category) {
        return res
          .status(400)
          .json({ success: false, message: 'category not found' });
      }

      await category.update({ name }, { where: { id: category.id } });

      return res
        .status(200)
        .json({ success: true, message: 'updated category', category });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'error updating category',
        error: err,
      });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const category = await Category.findByPk(id);

      if (!category) {
        return res
          .status(400)
          .json({ success: false, message: 'category not found' });
      }

      await Category.destroy({ where: { id: category.id } });

      return res
        .status(200)
        .json({ success: true, message: 'category deleting successfully' });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'error deleting category',
        error: err,
      });
    }
  }
}

module.exports = new CategoryController();
