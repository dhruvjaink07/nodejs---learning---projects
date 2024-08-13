const mongoose = require('mongoose');
const slugify = require('slugify');

// Tour Scheme
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must Have a name'],
    unique: true,
  },
  slug: String,
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
    default: 4.5
  },
  ratingsQuantity: {type: Number, default:0},
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
    default: Date.now(),
    select: false
  },
  startDates: [Date],
},{
  toJSON: {virtuals: true},
  toObject: {virtuals: true}, 
});
// Cannot use this virtual properties in the query as they are not really a part of the database
// this could also be done in the controller but as the mvc architecture says to offload most of the business logic in the models and keep the controllers as simple as possible
tourSchema.virtual('durationWeeks').get(function(){
  return this.duration / 7;
})

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
tourSchema.pre('save', function(next){
    this.slug = slugify(this.name, {lower : true});
    next();
});

// tourSchema.pre('save',function(next){
//   console.log("Will Save Document");
//   next();
// })

// tourSchema.post('save', function(doc, next){
//   console.log(doc);
//   next();
// });

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
