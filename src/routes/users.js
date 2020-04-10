const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.post('/users/consumers/register', UserController.create);

module.exports = router;
