const fs = require('fs');
const express = require('express');

const app = express();

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
  res.status(200).json({ status: 'success',result: tours.length ,data: { tours: tours } });
});
const port = 3000;
app.listen(port, () => {
  console.log(`Running on port ${port}...`);
});
