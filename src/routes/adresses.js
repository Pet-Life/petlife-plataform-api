const express = require('express');
const AddressController = require('../controllers/AddressController');

const router = express.Router();

router.get('/consumers/:id/adresses', AddressController.getById);
router.post('/consumers/:id/adresses', AddressController.create);

router.get('/adresses', AddressController.findAddress);

module.exports = router;
