const express = require('express');
const { booksController } = require('../controllers');

const router = express.Router();

const { getBooksController } = booksController();

// GET /api/books
router.get('/', getBooksController);

module.exports = router;
