const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/database')[env];

const db = {};

const User = require('../models/User');
const Consumer = require('../models/Consumer');

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

User.init(sequelize);
Consumer.init(sequelize);

User.associate(sequelize.models);
Consumer.associate(sequelize.models);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
