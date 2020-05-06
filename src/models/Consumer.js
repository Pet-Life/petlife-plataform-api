const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

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
            len: {
              arg: [8, 16],
              msg: 'the field must be 8 to 16 characters',
            },
            notEmpty: {
              msg: 'this field cannot be empty',
            },
          },
        },
        permissionLevel: {
          type: DataTypes.INTEGER,
          notEmpty: {
            msg: 'this field cannot be empty',
          },
        },
        avatar: {
          type: DataTypes.STRING,
          validate: {
            isUrl: {
              msg: 'this is not a valid url',
            },
          },
        },
        cpf: {
          type: DataTypes.STRING,
        },
        phone: {
          type: DataTypes.STRING,
        },
      },
      {
        hooks: {
          beforeCreate: (user) => {
            return bcrypt
              .hash(user.password, bcrypt.genSaltSync(10))
              .then((hash) => {
                user.password = hash;
              })
              .catch((err) => {
                console.log(err);
              });
          },
        },
        sequelize,
        modelName: 'consumer',
      }
    );
  }

  static associate(models) {
    this.hasMany(models.adresses, { foreignKey: 'consumerId', as: 'adresses' });
    this.hasOne(models.sale, {
      foreignKey: 'consumerId',
      as: 'consumers',
    });
  }
}

module.exports = Consumer;
