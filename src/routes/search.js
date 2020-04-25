const express = require('express');
const SearchController = require('../controllers/SearchController');

const router = express.Router();

router.get('/search', SearchController.getAll);

module.exports = router;
