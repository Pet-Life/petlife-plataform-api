const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        permissionLevel: DataTypes.INTEGER,
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
        modelName: 'users',
      }
    );
  }
}

module.exports = User;
