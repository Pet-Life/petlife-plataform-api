const express = require('express');
const multer = require('multer');
const ConumerController = require('../controllers/ConsumerController');
const ShopController = require('../controllers/ShopController');
const uploadConfig = require('../config/upload');
const auth = require('../middlewares/auth');

const router = express.Router();
const upload = multer(uploadConfig);

// endpoints consumers
router.post('/users/consumers/signup', ConumerController.create);
router.get('/users/consumers/:id', ConumerController.getById);
router.post('/users/consumers/auth/login', ConumerController.login);

// endpoints shops
router.get('/users/shops/:id', ShopController.getById);
router.post('/users/shops/signup', ShopController.create);
router.post('/users/shops/auth/login', ShopController.login);
router.patch(
  '/products/:id',
  auth,
  upload.single('photo'),
  ShopController.update
);

module.exports = router;
