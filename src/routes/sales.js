const express = require('express');
const SaleController = require('../controllers/SaleController');

const router = express.Router();

router.post('/sales', SaleController.create);

module.exports = router;
