const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json()); // This is called Middle ware

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the Server Side!', app: 'natours' });
// });

// app.post('/', (req, res) => {
//     res.status(201).send("You can post to this url");
// })

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', result: tours.length, data: { tours: tours } });
});

app.get('/api/v1/tour/:id/:what?',(req,res) => {
  console.log(req.params);
  const id = req.params.id * 1; // This is the way to get the parameters from the url and using the '?' this sign we can also declare optional url parameters // and multiplying it with 1 automatically converts the String to int if the value of String is 1
  const tour = tours.find(el => el.id == id);
  if (!tour){
    return res.status(404).json({status: 'fail',data: 'No tour found'});
  }

  res.status(200).send({status:'success',data:{
    tour
  }})
});

app.post('/api/v1/tours', (req, res) => {
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
});

// Patch Request
app.patch('/api/v1/tour/:id',(req,res)=>{
  console.log(req.params);
  const id = req.params.id * 1;
  if(id > tours.length){
    return res.status(400).send({status : 'fail',data:null});
  }

  res.status(200).json({status:'success',data:{
    tour: '<Updated tour>'
  }})
});

// Dalete Request
app.delete('/api/v1/tour/:id',(req,res)=>{
  console.log(req.params);
  const id = req.params.id * 1;
  if(id > tours.length){
    return res.status(400).send({status : 'fail',data:{
      message: 'Invalid tour ID'
    }});
  }

  res.status(204).json({status:'success',data:{
    tour: null
  }})
});

const port = 3000;
app.listen(port, () => {
  console.log(`Running on port ${port}...`);
});
