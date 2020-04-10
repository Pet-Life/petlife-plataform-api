const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Model {
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
        modelName: 'user',
      }
    );
  }

  static associate(models) {
    this.hasOne(models.consumer, { foreignKey: 'userId', as: 'user' });
  }
}

module.exports = User;
