const { Model, DataTypes } = require('sequelize');

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        photo: {
          type: DataTypes.STRING,
          get() {
            const name = this.getDataValue('photo');
            return `http://192.168.0.19:5000/files/${name}`;
          },
        },
        name: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: {
              msg: 'this field cannot be empty',
            },
          },
        },
        description: {
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
        status: {
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
        modelName: 'product',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.shop, {
      foreignKey: 'shopId',
      as: 'shops',
    });
    this.belongsTo(models.category, {
      foreignKey: 'categoryId',
      as: 'categories',
    });
    this.hasOne(models.sale, { foreignKey: 'productId', as: 'sales' });
  }
}

module.exports = Product;
