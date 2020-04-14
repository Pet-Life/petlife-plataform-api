const express = require('express');
const ConumerController = require('../controllers/ConsumerController');
const ShopController = require('../controllers/ShopController');

const router = express.Router();

// endpoints consumers
router.post('/users/consumers/signup', ConumerController.create);
router.get('/users/consumers', ConumerController.getAll);

// endpoints shops
router.post('/users/shops/signup', ShopController.create);

module.exports = router;
