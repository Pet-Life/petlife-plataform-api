const express = require('express');
const AddressController = require('../controllers/AddressController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/consumers/:id/adresses', auth, AddressController.getById);
router.post('/consumers/:id/adresses', AddressController.create);
router.delete('/consumers/adresses/:id', auth, AddressController.delete);

module.exports = router;
