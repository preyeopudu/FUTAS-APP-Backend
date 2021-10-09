const express = require('express');
const db = require('./models/libraryModel');
const app = express();

exports.getBooks = async(req, res) => {

    try {
        const books = await db.find({ 'course': course, 'level': level });
        res.render('/', { 'title': course, 'level': level });
    } catch (err) {
        return res.status(500).json(err);
    }
};

exports.getBook = async(req, res) => {
    try {
        const book = await db.findOne({ 'course': course, 'level': level });
        res.render('/books', { 'title': course, 'level': level })
    }
}

// book upload
exports.postBook = async(req, res) => {
const book = new Book(req.body)
book.save()
    .then((result) => {
        res.redirect('/E');
    })
    .catch((err) => {
        console.log(err)
    });
})

// book var bodyParser = require('body-parser');
app.use(bodyParser.json());


app.delete('/products/:id', function(req, res) {
    const { id } = req.params;
    res.send(`Delete record with id id`);
});