const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// 1) MiddleWare
app.use(morgan('dev'));
app.use(express.json()); // This is called Middle ware

app.use((req, res, next) => {
  console.log('Hey from Middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toLocaleString();
  next();
});
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/users.json`)
);

// 2) Route Handlers (Tours)
const getALlTours = (req, res) => {
  console.log(`request time: ${req.requestTime}`);
  res.status(200).json({
    status: 'success',
    time: req.requestTime,
    result: tours.length,
    data: { tours: tours },
  });
};

const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1; // This is the way to get the parameters from the url and using the '?' this sign we can also declare optional url parameters // and multiplying it with 1 automatically converts the String to int if the value of String is 1
  const tour = tours.find((el) => el.id == id);
  if (!tour) {
    return res.status(404).json({ status: 'fail', data: 'No tour found' });
  }

  res.status(200).send({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(400).send({ status: 'fail', data: null });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour>',
    },
  });
};

const deleteTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(400).send({
      status: 'fail',
      data: {
        message: 'Invalid tour ID',
      },
    });
  }

  res.status(204).json({
    status: 'success',
    data: {
      tour: null,
    },
  });
};

// 2) Route Handlers (Users)
const getAllUsers = (req, res) => {
  console.log(req.hostname);
  console.log(req.ip);
  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
};

const createUser = (req, res) => {
  res.status(500).json({ status: 'error', data: 'This route is not yet available'});
};

const getOneUser = (req,res) => {
  res.status(500).json({ status: 'error', data: 'This route is not yet available'});
};

const updateUser = (req,res) => {
  res.status(500).json({ status: 'error', data: 'This route is not yet available'});
};

const deleteUser = (req,res) => {
  res.status(500).json({ status: 'error', data: 'This route is not yet available'});
};
// 3) Routes

app.route('/api/v1/tours').get(getALlTours).post(createTour);
app.route('/api/v1/tour/:id').get(getTour).patch(updateTour).delete(deleteTour);
app.route('/api/v1/users').get(getAllUsers).post(createUser);
app
  .route('/api/v1/users/:id')
  .get(getOneUser)
  .patch(updateUser)
  .delete(deleteUser);
//4) Start Server
const port = 3000;
app.listen(port, () => {
  console.log(`Running on port ${port}...`);
});
