const { Model, DataTypes } = require('sequelize');

class Consumer extends Model {
  static init(sequelize) {
    super.init(
      {
        avatar: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: {
              msg: 'this field cannot be empty',
            },
          },
          defaultValue: 'https://i.imgur.com/L1RTiiC.png',
        },
        cpf: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: {
              msg: 'this field cannot be empty',
            },
            is: /^[\d{3}.\d{3}.\d{3}\-\d{2}]+$/i,
          },
          defaultValue: '000.000.000-00',
        },
        phone: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: {
              msg: 'this field cannot be empty',
            },
            is: /^[(\d{3})\s\d{5}-\d{4}]+$/i,
          },
          defaultValue: '(00) 00000-0000',
        },
      },
      {
        sequelize,
        modelName: 'consumer',
      }
    );
  }

  static associate(models) {
    this.hasOne(models.user, { foreignKey: 'id', as: 'user' });
  }
}

module.exports = Consumer;
