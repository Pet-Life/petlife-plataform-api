const express = require('express');
const CategoryController = require('../controllers/CategoryController');

const router = express.Router();

router.get('/categories', CategoryController.getAll);
router.get('/categories/:id', CategoryController.getById);
router.post('/categories', CategoryController.create);

module.exports = router;
