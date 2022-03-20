const Book = require('../database/mongoose.models')

// const createMessage = async ({text})=>{
//     const newMessage = await Book.model.create(text)
//     return (newMessage != null)
// }

exports.getAllBooks = async ()=>{
    return Book.find()
}
