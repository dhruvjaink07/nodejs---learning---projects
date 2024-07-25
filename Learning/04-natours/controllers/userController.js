const fs = require('fs');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

// 2) Route Handlers (Users)
exports.getAllUsers = (req, res) => {
  console.log(req.hostname);
  console.log(req.ip);
  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
};

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
