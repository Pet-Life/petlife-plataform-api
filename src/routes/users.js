const express = require('express');
const ConumerController = require('../controllers/ConsumerController');
const ShopController = require('../controllers/ShopController');

const router = express.Router();

// endpoints consumers
router.post('/users/consumers/signup', ConumerController.create);
router.get('/users/consumers', ConumerController.getAll);

// endpoints shops
router.get('/users/shops/', ShopController.getById);
router.post('/users/shops/auth/login', ShopController.login);
router.post('/users/shops/signup', ShopController.create);

module.exports = router;
