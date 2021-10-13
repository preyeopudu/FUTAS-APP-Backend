const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// using the schema toset the datatypes of the blog
const librarySchema = new Schema({
        name: {
            type: String,
            required: true
        },
        fileType: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        level: {
            type: String,
            required: true
        },
        course: {
            type: String,
            required: true
        },
        fileUrl: {
            type: String,
            required: true
        },
    },

    {
        versionKey: false,
        timestamps: true,
    }
);
// creating the model
const Book = mongoose.model('library', librarySchema);
// to export the blog model
module.export = Book;