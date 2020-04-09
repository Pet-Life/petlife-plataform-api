const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.post('/users/consumer/register', UserController.create);

module.exports = router;
