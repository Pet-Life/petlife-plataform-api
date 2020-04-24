const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

class Shop extends Model {
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
        cnpj: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: {
              msg: 'this field cannot be empty',
            },
          },
          defaultValue: '00.000.000/0000-00',
        },
        phone: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: {
              msg: 'this field cannot be empty',
            },
          },
          defaultValue: '(00) 0000-0000',
        },
        deliveryType: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          validate: {
            notEmpty: {
              msg: 'this field cannot be empty',
            },
          },
        },
        businessHours: {
          type: DataTypes.ARRAY(DataTypes.TEXT),
          validate: {
            notEmpty: {
              msg: 'this field cannot be empty',
            },
          },
        },
        status: {
          type: DataTypes.STRING,
          defaultValue: 'ativo',
          validate: {
            notEmpty: {
              msg: 'this field cannot be empty',
            },
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
        modelName: 'shop',
      }
    );
  }

  static associate(models) {
    this.hasMany(models.product, { foreignKey: 'shopId', as: 'products' });
    this.hasOne(models.sale, { foreignKey: 'shopId', as: 'shops' });
  }
}

module.exports = Shop;
