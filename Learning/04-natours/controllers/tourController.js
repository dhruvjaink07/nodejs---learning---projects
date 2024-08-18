const AppError = require('../utils/appError');
const Tour = require('./../models/tourModel');
const ApiFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');

exports.aliasTopTours = async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  next();
};

exports.getALlTours = catchAsync(async (req, res) => {
    console.log(req.query);
    // EXECUTING QUERY
    const features = new ApiFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const allTours = await features.query;

    // SENDING RESPONSE
    res.status(200).json({
      status: 'success',
      result: allTours.length,
      data: {
        allTours,
      },
    });
});

exports.getTour = catchAsync(async (req, res) => {
    const id = req.params.id; // This is the way to get the parameters from the url and using the '?' this sign we can also declare optional url parameters // and multiplying it with 1 automatically converts the String to int if the value of String is 1
    const tour = await Tour.findById(id);

    if(!tour){
      return next(new AppError('No tour found with that ID',404));
    }
      res.status(200).send({
        status: 'success',
        data: {
          tour,
        },
      });
});

exports.createTour = catchAsync(async (req, res,next) => {
  const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
});

exports.updateTour = catchAsync(async (req, res) => {
    const id = req.params.id;
    const tour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if(!tour){
      return next(new AppError('No tour found with that ID',404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
});

exports.deleteTour = catchAsync(async (req, res) => {
    const id = req.params.id;
    const tour = await Tour.findByIdAndDelete(id);

    if(!tour){
      return next(new AppError('No tour found with that ID',404));
    }

    res.status(204).json({
      status: 'success',
      message: 'Tour Deleted Successful',
    });
});

exports.tourStats = catchAsync(async (req, res) => {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          // _id: "$ratingsAverage",
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: {
          avgPrice: 1,
        },
      },
      // {
      //   $match: {_id: {$ne: 'EASY'}}
      // }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
});

exports.getMonthlyPlan = catchAsync(async (req, res) => {
    const year = req.params.year * 1; // 2021

    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: { numTourStarts: -1 },
      },
      {
        $limit: 12,
      },
    ]);
    res.status(200).json({
      status: 'success',
      results: plan.length,
      data: {
        plan,
      },
    });
});
