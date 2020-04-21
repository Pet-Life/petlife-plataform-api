const { Model, DataTypes } = require('sequelize');

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        photo: {
          type: DataTypes.STRING,
        },
        name: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: {
              msg: 'this field cannot be empty',
            },
          },
        },
        manufacturer: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: {
              msg: 'this field cannot be empty',
            },
          },
        },
        unityPrice: {
          type: DataTypes.REAL,
          validate: {
            notEmpty: {
              msg: 'this field cannot be empty',
            },
          },
        },
        quantity: {
          type: DataTypes.INTEGER,
          validate: {
            notEmpty: {
              msg: 'this field cannot be empty',
            },
          },
        },
      },
      {
        sequelize,
        modelName: 'product',
      }
    );
  }
}

module.exports = Product;
