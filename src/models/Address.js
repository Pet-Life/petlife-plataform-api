const { Model, DataTypes } = require('sequelize');

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        zicode: {
          type: DataTypes.INTEGER,
          validate: {
            notEmpty: {
              msg: 'this field cannot be empty',
            },
          },
        },
        address: {
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
        modelName: 'address',
      }
    );
  }

  static associate(models) {
    Address.belongsTo(models.consumer, {
      foreignKey: 'consumerId',
      as: 'user',
    });
  }
}

module.exports = Address;
