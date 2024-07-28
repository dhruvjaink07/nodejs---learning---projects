// const fs = require('fs');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// 2) Route Handlers (Tours)

exports.checkReqBody = (req, res, next)=>{
    // if(req.body['name'] == null  || req.body['price'] == null){
    //     return res.status(400).json({
    //         status: 'fail',
    //         message: 'filed name and price are required'
    //     });
    // } // My Logic 
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
                    status: 'fail',
                    message: 'Missing name or price fields'
                });                
    }

    next();
}

exports.getALlTours = (req, res) => {
  console.log(`request time: ${req.requestTime}`);
  res.status(200).json({
    status: 'success',
    time: req.requestTime,
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1; // This is the way to get the parameters from the url and using the '?' this sign we can also declare optional url parameters // and multiplying it with 1 automatically converts the String to int if the value of String is 1


  res.status(200).send({
    status: 'success',
    data: {
    },
  });
};

exports.createTour = (req, res) => {

};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: {
      tour: null,
    },
  });
};
