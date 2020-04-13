const { Model, DataTypes } = require('sequelize');

class Consumer extends Model {
  static init(sequelize) {
    super.init(
      {
        firstName: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: {
              msg: 'this field cannot be empty',
            },
          },
        },
        lastName: {
          type: DataTypes.STRING,
          notEmpty: {
            msg: 'this field cannot be empty',
          },
        },
        email: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: {
              msg: 'this field cannot be empty',
            },
            isEmail: {
              msg: 'enter a valid email',
            },
          },
        },
        password: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: {
              msg: 'this field cannot be empty',
            },
            len: {
              arg: [8, 16],
              msg: 'the field must be 8 to 16 characters',
            },
          },
        },
        permissionLevel: {
          type: DataTypes.INTEGER,
          notEmpty: {
            msg: 'this field cannot be empty',
          },
          min: 1,
          max: 2,
        },
        avatar: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: {
              msg: 'this field cannot be empty',
            },
            isUrl: {
              msg: 'this is not a valid url',
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
          },
          defaultValue: '000.000.000-00',
        },
        phone: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: {
              msg: 'this field cannot be empty',
            },
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
}

module.exports = Consumer;
