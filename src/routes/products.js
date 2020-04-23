const express = require('express');
const multer = require('multer');
const ProductController = require('../controllers/ProductController');
const uploadConfig = require('../config/upload');

const router = express.Router();
const upload = multer(uploadConfig);

router.post('/products', upload.single('photo'), ProductController.create);

module.exports = router;
