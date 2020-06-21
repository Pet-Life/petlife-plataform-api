const express = require('express');
const multer = require('multer');
const ConumerController = require('../controllers/ConsumerController');
const ShopController = require('../controllers/ShopController');
const uploadConfig = require('../config/upload');
const auth = require('../middlewares/auth');
const auth2 = require('../middlewares/auth2');

const router = express.Router();
const upload = multer(uploadConfig);

// endpoints consumers
router.post('/users/consumers/signup', ConumerController.create);
router.get('/users/consumers/:id', ConumerController.getById);
router.post('/users/consumers/auth/login', ConumerController.login);
router.patch(
  '/users/consumer/:id',
  auth,
  upload.single('avatar'),
  ConumerController.update
);
router.delete('/users/consumers/:id', auth, ConumerController.delete);

// endpoints shops
router.get('/users/shops/:id', ShopController.getById);
router.post('/users/shops/signup', ShopController.create);
router.post('/users/shops/auth/login', ShopController.login);
router.patch(
  '/users/shops/:id',
  auth2,
  upload.single('avatar'),
  ShopController.update
);
router.delete('/users/shops/:id', auth2, ShopController.delete);

module.exports = router;
