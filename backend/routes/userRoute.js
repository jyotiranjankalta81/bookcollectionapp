const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const asynHandler = require('express-async-handler');
const authMiddleware = require('../middlewares/authMiddlewareHandler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const usersRoute = express.Router();

usersRoute.post(
  '/register',
  asynHandler(async (req, res) => {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email: email })
    if (userExists) {
      throw new Error('User Exist')
    }
    const userCreated = await User.create({ email, name, password })
    // res.send(userCreated);
    res.json({
      _id: userCreated.id,
      name: userCreated.name,
      password: userCreated.password,
      email: userCreated.email,
      token: generateToken(userCreated._id)
    })
  })
)
// login
usersRoute.post(
  '/login',
  asynHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && user.isPasswordMatch(password)) {
      // res.send(user);
      // set status code
      res.status(200)
      res.json({
        _id: user.id,
        name: user.name,
        password: user.password,
        email: user.email,
        token: generateToken(user._id)
      })
    } else {
      res.status(401)
      throw new Error('Invalid credentials')
    }
  })
)
// update User
usersRoute.put(
  'profile/update',
  authMiddleware,
  expressAsyncHandler(async (req, res) => {
    // Find the login usr by Id
    const user = await User.findById(req.user._id)

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.bod.email || user.email;
      if (req.body.password) {
        user.password = req.body.password || user.password
      }

      const updatedUser = await user.save()
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        token: generateToken(updatedUser._id)
      })
    }
  })
)

// Delete User
// this endpoint is dynamic because if one delete a user you need the id of the user
// this id is dynamic we can acess this is inour express using request.query
usersRoute.delete('/:id', (req, res) => {
  res.send('delete route')
})
// fetch user
usersRoute.get(
  '/',
  authMiddleware,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({})
    if (users) {
      res.status(200).json(users)
    } else {
      res.status(500)

      throw new Error('No users found at the moment')
    }
  })
)

// Profile route
usersRoute.get(
  '/profile',
  authMiddleware,
  asynHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user._id).populate('books')
      // res.send(user);
      if (!user) throw new Error(" You don't have any profile yet")
      res.status(200)
      res.send(user)
    } catch (error) {
      res.status(500)
      throw new Error('Server')
    }
  })
)
module.exports = usersRoute
