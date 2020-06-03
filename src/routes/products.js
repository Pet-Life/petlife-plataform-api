const express = require('express');
const multer = require('multer');
const ProductController = require('../controllers/ProductController');
const uploadConfig = require('../config/upload');
const auth = require('../middlewares/auth');

const router = express.Router();
const upload = multer(uploadConfig);

router.get('/products', ProductController.getAll);
router.get('/products/:id', ProductController.getById);
router.post(
  '/products',
  auth,
  upload.single('photo'),
  ProductController.create
);
router.patch(
  '/products/:id',
  auth,
  upload.single('photo'),
  ProductController.update
);
router.delete('/products/:id', auth, ProductController.delete);

module.exports = router;
