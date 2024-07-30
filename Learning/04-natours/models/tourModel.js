const mongoose = require('mongoose');

// Tour Scheme
const tourScheme = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must Have a name'],
    unique: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration']
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a summary']
  },
  description: {
    type: String,
    trim:true,
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have max size of group']
  },
  difficulty: {
    type:String, 
    required: [true, 'A tour must have difficulty']
  },
  ratingsAverage: {
    type: Number,
  },
  ratingsQuantity: Number,
  imageCover: {
    type: String,
    required: [true, 'A tour must have a Image Cover'],
  },
  images: [String],
  price: {
    type: Number,
    required: [true, 'A tour must Have price'],
  },
  priceDiscount: Number,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  startDates: [Date],


});

const Tour = mongoose.model('Tour', tourScheme);

module.exports = Tour;
