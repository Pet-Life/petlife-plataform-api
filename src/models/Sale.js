const { Model, DataTypes } = require('sequelize');

class Sale extends Model {
  static init(sequelize) {
    super.init(
      {
        priceTotal: {
          type: DataTypes.REAL,
          validate: {
            notEmpty: {
              msg: 'this field cannot be empty',
            },
          },
        },
      },
      {
        sequelize,
        modelName: 'sale',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.product, { foreignKey: 'productId', as: 'products' });
    this.belongsTo(models.consumer, {
      foreignKey: 'consumerId',
      as: 'consumers',
    });
    this.belongsTo(models.shop, { foreignKey: 'shopId', as: 'shops' });
    this.belongsTo(models.payment, { foreignKey: 'paymentId', as: 'payments' });
  }
}

module.exports = Sale;
