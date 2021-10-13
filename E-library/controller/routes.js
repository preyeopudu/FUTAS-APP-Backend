const router = require('express').Router();

const bookController = require('../app');

// Browse books
router.get('/', boookController.getBooks);

// Fetch individual book details
router.get("/:id", bookController.getBookById);

// adding books
router.post('/E-library', bookController.postBook);

// finding the book
router.post('/', bookController.findBook);

router.del('/', bookController.deleteBook);

module.exports = router;