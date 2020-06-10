const { Model, DataTypes } = require('sequelize');

class Sale extends Model {
  static init(sequelize) {
    super.init(
      {
        products: {
          type: DataTypes.ARRAY(DataTypes.TEXT),
          validate: {
            notEmpty: {
              msg: 'this field cannot be empty',
            },
          },
        },
        priceTotal: {
          type: DataTypes.REAL,
          notEmpty: {
            msg: 'this field cannot be empty',
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
    this.belongsTo(models.consumer, {
      foreignKey: 'idConsumer',
      as: 'salesConsumer',
    });
    this.belongsTo(models.shop, { foreignKey: 'idShop', as: 'salesShop' });
  }
}

module.exports = Sale;
