const mongoose = require('mongoose')

// create schema
const booksSchema= new mongoose.Schema({
    title:{
        type: String,
    }
})

// schema reference
const Book = mongoose.model('Book', booksSchema,'Book')
exports.Book
const book1 = new Book({ title: 'test'})
book1.save(function (err, book) {
    if (err) return console.error(err);
    console.log(book.title + " saved to bookstore collection.");
    });

module.exports = mongoose.model("Book",booksSchema)