const { Model, DataTypes } = require('sequelize');

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: {
              msg: 'this field cannot be empty',
            },
          },
        },
      },
      {
        sequelize,
        modelName: 'category',
      }
    );
  }

  static associate(models) {
    Category.hasOne(models.product, {
      foreignKey: 'categoryId',
      as: 'categories',
    });
  }
}

module.exports = Category;
