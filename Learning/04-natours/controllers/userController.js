const User = require('./../models/userModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');


// 2) Route Handlers (Users)
exports.getAllUsers = catchAsync(async(req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

exports.createUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', data: 'This route is not yet available' });
};

exports.getOneUser = (req, res) => {
  const _id = req.params._id;
  const user = users.find((el) => el._id == _id);
  console.log(user);
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
};

exports.updateUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', data: 'This route is not yet available' });
};

exports.deleteUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', data: 'This route is not yet available' });
};
