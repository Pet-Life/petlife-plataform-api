const express = require('express');
const ConumerController = require('../controllers/ConsumerController');
const ShopController = require('../controllers/ShopController');
const SessionController = require('../controllers/SessionController');

const router = express.Router();

// endpoints consumers
router.post('/users/consumers/signup', ConumerController.create);
router.get('/users/consumers', ConumerController.getAll);
router.get('/users/consumers/:id', ConumerController.getById);
router.post('/users/consumers/auth/login', SessionController.login);

// endpoints shops
router.get('/users/shops/', ShopController.getById);
router.post('/users/shops/signup', ShopController.create);

module.exports = router;
