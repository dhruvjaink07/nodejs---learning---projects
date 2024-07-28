const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MiddleWare
app.use(morgan('dev'));
app.use(express.json()); // This is called Middle ware
app.use(express.static(`${__dirname}/public`)) // Use to server static files

app.use((req, res, next) => {
  console.log('Hey from Middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toLocaleString();
  next();
});

// 2) Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
