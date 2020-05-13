const express = require('express');
const SaleController = require('../controllers/SaleController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/sales', auth, SaleController.getAll);
router.post('/sales', auth, SaleController.create);
router.delete('/sales/:id', auth, SaleController.delete);

module.exports = router;
