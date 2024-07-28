const Tour = require('./../models/tourModel');

exports.getALlTours = async (req, res) => {
try{
  const allTours = await Tour.find();
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
