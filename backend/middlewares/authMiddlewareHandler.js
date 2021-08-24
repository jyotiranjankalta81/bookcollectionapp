const asynHandler = require('express-async-handler');
// const expressAsyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken')
const User = require('../models/User')
// const bookRouter = require('../routes/bookRoutes')
const authMiddleware = asynHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      // console.log(token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await User.findById(decoded.id);
      req.user = user;
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorize User');
    }
  }
})

module.exports = authMiddleware;
