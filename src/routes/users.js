const express = require('express');
const ConumerController = require('../controllers/ConsumerController');

const router = express.Router();

router.post('/users/consumers/signup', ConumerController.create);
router.get('/users/consumers', ConumerController.getAll);

module.exports = router;
