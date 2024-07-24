const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json()); // This is called Middle ware

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getALlTours = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', result: tours.length, data: { tours: tours } });
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

// app.get('/api/v1/tours',getALlTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tour/:id', getTour);
// app.patch('/api/v1/tour/:id', updateTour);
// app.delete('/api/v1/tour/:id', deleteTour);

app.route('/api/v1/tours').get(getALlTours).post(createTour);
app.route('/api/v1/tour/:id').get(getTour).patch(updateTour).delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`Running on port ${port}...`);
});
