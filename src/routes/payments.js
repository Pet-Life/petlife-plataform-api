const express = require('express');
const PaymentController = require('../controllers/PaymentController');

const router = express.Router();

router.get('/payments', PaymentController.getAll);
router.get('/payments/:id', PaymentController.getById);
router.post('/payments', PaymentController.create);
router.patch('/payments/:id', PaymentController.update);
router.delete('/payments/:id', PaymentController.delete);

module.exports = router;
