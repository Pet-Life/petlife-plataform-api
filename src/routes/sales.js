const express = require('express');
const SaleController = require('../controllers/SaleController');

const router = express.Router();

router.get('/sales', SaleController.getAll);
router.post('/sales', SaleController.create);
router.delete('/sales/:id', SaleController.delete);

module.exports = router;
