const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/database')[env];

const db = {};

const Consumer = require('../models/Consumer');
const Shop = require('../models/Shop');
const Payment = require('../models/Payment');
const Category = require('../models/Category');
const Address = require('../models/Address');
const Product = require('../models/Product');

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

// models init
Consumer.init(sequelize);
Address.init(sequelize);
Shop.init(sequelize);
Payment.init(sequelize);
Category.init(sequelize);
Product.init(sequelize);

// association
Consumer.associate(sequelize.models);
Address.associate(sequelize.models);
Shop.associate(sequelize.models);
Product.associate(sequelize.models);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
