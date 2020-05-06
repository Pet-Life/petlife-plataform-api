const express = require('express');
const ConumerController = require('../controllers/ConsumerController');
const ShopController = require('../controllers/ShopController');

const router = express.Router();

// endpoints consumers
router.post('/users/consumers/signup', ConumerController.create);
router.get('/users/consumers/:id', ConumerController.getById);
router.post('/users/consumers/auth/login', ConumerController.login);

// endpoints shops
router.get('/users/shops/:id', ShopController.getById);
router.post('/users/shops/signup', ShopController.create);
router.post('/users/shops/auth/login', ShopController.login);

module.exports = router;
