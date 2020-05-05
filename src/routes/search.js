const express = require('express');
const SearchController = require('../controllers/SearchController');

const router = express.Router();

router.post('/search', SearchController.getAll);

module.exports = router;
