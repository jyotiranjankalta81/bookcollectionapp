const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const authMiddleware = require('../middlewares/authMiddlewareHandler')
const Book = require('../models/Book')

const bookRouter = express.Router()
// Create Book
bookRouter.post(
  '/',
  authMiddleware,
  expressAsyncHandler(async (req, res) => {
    // Grab the user from the req.user
    // const userId = req.user._id
    const book = await Book.create(req.body)

    if (book) {
      res.status(200)
      res.json(book)
    } else {
      res.status(500)
      throw new Error('Book created Failed')
    }
  })
)
// Find Book
bookRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const book = await Book.find({})

    if (book) {
      res.status(200)
      res.json(book)
    } else {
      res.status(500)
      throw new Error('Book created Failed')
    }
  })
)
// update Book
bookRouter.put(
  '/:id',
  authMiddleware,
  expressAsyncHandler(async (req, res) => {
    // res.send(req.params.id);
    const book = await Book.findById(req.params.id)

    if (book) {
      const updateBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      res.status(200);
      res.json(updateBook);
    } else {
      res.status(500);
      throw new Error('Book update Failed');
    }
  })
);
// delete Book
bookRouter.delete(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    try {
      const book = await Book.findByIdAndDelete(req.params.id)
      res.status(200);
      res.send(book);
    } catch (error) {
      res.json(error)
    }
  })
)
module.exports = bookRouter;
