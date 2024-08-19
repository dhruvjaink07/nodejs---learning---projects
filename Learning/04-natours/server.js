const mongoose = require('mongoose');
const env = require('dotenv'); 
const app = require('./app');

env.config({path: './config.env'});

process.on('uncaughtException',err=>{
  console.log('UNCAUGHT EXCEPTION! 💥 ...');
  console.log(err.name, err.message);
});
// const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

const DB = process.env.DATABASE_LOCAL; 

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology:true,
  useCreateIndex:true,
  useFindAndModify:true
}).then(con => console.log('DB Connection successful')).catch(err=>console.log("Error Connecting Database"));


const port = 3000;
const server = app.listen(port, () => {
  console.log(`Running on port ${port}...`);
});

process.on('unhandledRejection',err=>{
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  server.close(()=>{
    process.exit(1);
  });
});
