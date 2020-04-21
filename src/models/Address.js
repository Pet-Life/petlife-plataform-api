const { Model, DataTypes } = require('sequelize');

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        zipcode: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: {
              msg: 'this field cannot be empty',
            },
          },
        },
        street: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: {
              msg: 'this field cannot be empty',
            },
          },
        },
        number: {
          type: DataTypes.INTEGER,
        },
        district: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: {
              msg: 'this field cannot be empty',
            },
          },
        },
        complement: {
          type: DataTypes.STRING,
        },
        city: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: {
              msg: 'this field cannot be empty',
            },
          },
        },
        state: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: {
              msg: 'this field cannot be empty',
            },
          },
        },
        coordinates: {
          type: DataTypes.ARRAY(DataTypes.REAL),
          validate: {
            notEmpty: {
              msg: 'this field cannot be empty',
            },
          },
        },
      },
      {
        sequelize,
        modelName: 'adresses',
      }
    );
  }

  static associate(models) {
    Address.belongsTo(models.consumer, {
      foreignKey: 'consumerId',
      as: 'adresses',
    });
  }
}

module.exports = Address;
