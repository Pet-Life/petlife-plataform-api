const express = require('express');
const SaleController = require('../controllers/SaleController');

const router = express.Router();

router.get('/sales', SaleController.getAll);
router.post('/sales', SaleController.create);

module.exports = router;
