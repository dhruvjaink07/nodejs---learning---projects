const mongoose = require('mongoose');

// Tour Scheme
const tourScheme = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must Have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must Have price'],
  },
});

const Tour = mongoose.model('Tour', tourScheme);

module.exports = Tour;
