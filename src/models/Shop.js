const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

class Shop extends Model {
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
          get() {
            const name = this.getDataValue('avatar');
            return `http://127.0.0.1:5000/files/${name}`;
          },
          validate: {
            notEmpty: {
              msg: 'this field cannot be empty',
            },
            isUrl: {
              msg: 'this is not a valid url',
            },
          },
        },
        cnpj: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: {
              msg: 'this field cannot be empty',
            },
          },
        },
        phone: {
          type: DataTypes.STRING,
        },
        deliveryType: {
          type: DataTypes.STRING,
        },
        businessHours: {
          type: DataTypes.ARRAY(DataTypes.TEXT),
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
          type: DataTypes.GEOMETRY('POINT'),
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
    this.hasMany(models.sale, { foreignKey: 'idShop', as: 'sales' });
  }
}

Shop.prototype.validPassword = (password) => {
  bcrypt.compare(password, this.password, (err, result) => {
    if (err) {
      return err;
    }

    return result;
  });
};

module.exports = Shop;
