const express = require('express');
const multer = require('multer');
const ProductController = require('../controllers/ProductController');
const uploadConfig = require('../config/upload');
const auth2 = require('../middlewares/auth2');

const router = express.Router();
const upload = multer(uploadConfig);

router.get('/products', ProductController.getAll);
router.get('/products/:id', ProductController.getById);
router.post(
  '/products',
  auth2,
  upload.single('photo'),
  ProductController.create
);
router.patch(
  '/products/:id',
  auth2,
  upload.single('photo'),
  ProductController.update
);
router.delete('/products/:id', auth2, ProductController.delete);

module.exports = router;
