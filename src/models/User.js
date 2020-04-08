const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        permission_level: DataTypes.INTEGER,
      },
      {
        hooks: {
          beforeCreate: (user) => {
            const salt = bcrypt.genSaltSync();
            // eslint-disable-next-line no-param-reassign
            user.password = bcrypt.hashSync(user.password, salt);
          },
        },
        sequelize,
        modelName: 'users',
      }
    );
  }
}

module.exports = User;
