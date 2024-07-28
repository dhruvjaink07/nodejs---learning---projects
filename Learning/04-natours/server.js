const mongoose = require('mongoose');
const env = require('dotenv'); 
const app = require('./app');

env.config({path: './config.env'});

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology:true,
  useCreateIndex:true,
  useFindAndModify:true
}).then(con => console.log('DB Connection successful')).catch(err=>console.log("Error Connecting Database"));

const port = 3000;
app.listen(port, () => {
  console.log(`Running on port ${port}...`);
});