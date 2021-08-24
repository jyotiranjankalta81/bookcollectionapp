// @format

const { request } = require('express');
const express = require('express');
const dbConnect = require("./config/dbConnect");
const dotenv = require('dotenv');
const usersRoute = require('./routes/userRoute');
const error = require('./middlewares/errorMiddlewareHandler');
const bookRouter = require('./routes/bookRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
// DB connect
dotenv.config();
dbConnect();

// Passing body data
app.use(express.json());

// Routes end points
// Users
app.use('/api/users',usersRoute);
// Books
app.use('/api/books',bookRouter);

// Error middleware
app.use(error.errorMiddlewareHandler);




// Server
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
});