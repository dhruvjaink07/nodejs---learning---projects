const Tour = require('./../models/tourModel');

exports.getALlTours = async (req, res) => {
try{
  // BUILDING QUERY
  // 1A) Filtering
  const queryObj = {...req.query};
  const excludedFields = ['page','sort','limit','fields'];
  excludedFields.forEach(el=> delete queryObj[el]);

  // 1B) Advance Filtering
  // Very Useful for getting the exact data on user's preference 
  // So on the API we can do comparisions like greater than equal, greater, lesser, lesser then equal and much more
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

  let query = Tour.find(JSON.parse(queryStr));
  // 2) Sorting
  if(req.query.sort){
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
    // To avoid sorting conflicts we can do like this
    // sort('price,ratingsAverage')
  }else{
    query=query.sort('-createdAt')
  }
  // const allTours = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy');

  // EXECUTING QUERY
  const allTours = await query;

  // SENDING RESPONSE
  res.status(200).json({
    status: 'success',
    result: allTours.length,
    data: {
      allTours
    }
  });
}catch(err){
  res.status(400).json({
    status:'fail',
    message: err
  })
}
};

exports.getTour = async (req, res) => {
try{
  const id = req.params.id; // This is the way to get the parameters from the url and using the '?' this sign we can also declare optional url parameters // and multiplying it with 1 automatically converts the String to int if the value of String is 1
  const tour = await Tour.findById(id);
  if(tour){
  res.status(200).send({
    status: 'success',
    data: {
    tour},
  });}
  else{
    res.status(400).json({
      status:'fail',
      message:'Tour Not Found'
    })
  }
}catch(err){
  res.status(400).json({
    status:'fail',
    message:err
  })
}
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid Data Set',
    });
  }
};

exports.updateTour = async (req, res) => {
try{
  const id = req.params.id;
  const tour = await Tour.findByIdAndUpdate(id,req.body, {new:true,runValidators:true})
  res.status(200).json({
    status: 'success',
    data: {
      tour
    },
  });
}catch(err){
  res.status(400).json({
    status:'fail',
    message:err
  });
}
};

exports.deleteTour = async (req, res) => {
try{
  const id = req.params.id;
  await Tour.findByIdAndDelete(id);

  res.status(204).json({
    status: 'success',
    message:'Tour Deleted Successful'
  });
}catch(err){
  res.status(400).json({
    status:'fail',
    message:err
  });
}
};
