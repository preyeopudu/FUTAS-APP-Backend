const router = require('express').Router();

const bookController = require('./library');

// Browse books
router.get('/', bookController.getBooks);

// Fetch individual book details
router.get("/:id", bookController.getBookById);

// adding books
router.post('/E-library', bookController.postBook);

// finding the book
router.post('/', bookController.findBook);

router.delete('/', bookController.deleteBook);

module.exports = router;