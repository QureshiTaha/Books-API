const express = require('express');
const testing = require('./testing');
const books = require('./books');

const router = express.Router();
router.use('/testing', testing);
router.use('/books', books);

module.exports = router;
