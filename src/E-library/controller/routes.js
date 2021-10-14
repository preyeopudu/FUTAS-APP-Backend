const router = require('express').Router();

const bookController = require('./library');

// Browse books
router.get('/E-library', bookController.getBooks);

// Fetch individual book by id
router.get("/E-library:id", bookController.getBookById);

// adding books
router.post('/E-library', bookController.postBook);

// searching for a book
router.get('/E-library', bookController.findBook);

router.delete('/', bookController.deleteBook);

module.exports = router;