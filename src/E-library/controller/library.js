const db = require('./models/libraryModel');
const Joi = require('joi');

const newBookSchema = Joi.object().keys({
    course: Joi.string().required(),
    level: Joi.number().required()
});

// Getting the books from the database
exports.getBooks = async(req, res) => {

    try {
        const books = await db.find();
        res.json('/E-library', { 'title': course, 'level': level });
    } catch (err) {
        return res.status(500).json(err);
    }
};

// get a book from the database
exports.findBook = async(req, res) => {
    const value = req.body.searchName;
    const searchObj = {};
    searchObj[filter] = value;
    await newBookSchema.validate(searchObj);

    try {
        // Fetch the book from the database
        const find = await db.find(searchObj);
        res.json({
            'title': course,
            'level': level
        });
        if (!find) {
            throw new Error('Book not found');
        }
    } catch (err) {
        console.log(err);
    }
};



exports.getBookById = async(req, res) => {
    try {
        const book_id = req.param.book_id
        const book = await db.findById(book_id);
        res.json({ 'title': course, 'level': level });
    } catch (err) {
        return res.status(500).json(err);
    }
}

// book upload
exports.postBook = async(req, res) => {
    const book = new Book(req.body)
    await newBookSchema.validate(book);
    book.save()
        .then((result) => {
            res.redirect('/E-library');
        })
        .catch((err) => {
            console.log(err)
        });
};

exports.deleteBook = async(req, res) => {
    const book_id = req.params.book_id;
    try {
        const book = await db.findByIdAndRemove(book_id);
        res.redirect('E-library')
    } catch (err) {
        console.log(err)
    }
};