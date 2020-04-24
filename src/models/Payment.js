const { Model, DataTypes } = require('sequelize');

class Payment extends Model {
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
        modelName: 'payment',
      }
    );
  }

  static associate(models) {
    this.hasOne(models.sale, { foreignKey: 'paymentId', as: 'payments' });
  }
}

module.exports = Payment;
