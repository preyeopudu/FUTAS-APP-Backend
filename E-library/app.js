const db = require('./models/libraryModel');
const Joi = require('joi');

// Getting the books from the database
exports.getBooks = async(req, res) => {

    try {
        const books = await db.find();
        res.render('/E-library', { 'title': course, 'level': level });
    } catch (err) {
        return res.status(500).json(err);
    }
};

// get a book from the database
exports.findBook = async(req,res) => {
    const value = req.body.searchName;
    const searchObj = {};
    searchObj[filter] = value;

    try {
        // Fetch the book from the database
        const find = await db.find(searchObj);
        res.render('E-library', {
            'title': course, 'level': level
        });
    } if(!find) {
        throw new Error('Book not found');
    }
}


exports.getBookById = async(req, res) => {
    try {
        const book_id = req.param.book_id
        const book = await db.findById(book_id);
        res.render('/E-library/:id', { 'title': course, 'level': level });
    } catch (err) {
        return res.status(500).json(err);
    }
}

const newBookSchema = Joi.object().keys({
    course: Joi.string().required(),
    level: Joi.number().required()
});
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

exports.deleteBook = async(req,res) => {
    const book_id = req.params.book_id;
    try {
        const book = await db.findByIdAndRemove(book_id);
        res.redirect('E-library')
    } catch(err) {
        console.log(err)
    }
};
app.delete('/E-library/:id', (req, res) => {
    const { id } = req.params.id;
    res.send(`Delete record with id id`);
});