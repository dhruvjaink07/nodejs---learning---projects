const catchAsync = fn =>{
    return (req,res,next)=>{
      fn(req,res,next).catch(err=> next(err)) // This is the line where all the error are catched and passed on to the global error handling function
    } 
}

module.exports = catchAsync;
  