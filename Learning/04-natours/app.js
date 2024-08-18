const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// 1) MiddleWare
app.use(morgan('dev'));
app.use(express.json()); // This is called Middle ware
app.use(express.static(`${__dirname}/public`)) // Use to server static files



app.use((req, res, next) => {
  req.requestTime = new Date().toLocaleString();
  next();
});

// 2) Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// This is used to handle all the unhandled routes and sent a message better than sending html
app.all('*',(req,res,next)=>{
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server`
  // });

  next(new AppError(`Can't find ${req.originalUrl} on this server`,404));
});

// Global Error handling Middleware
app.use(globalErrorHandler);

module.exports = app;
