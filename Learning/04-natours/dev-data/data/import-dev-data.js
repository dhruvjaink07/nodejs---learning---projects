const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({path: './config.env'});

const DB = process.env.DATABASE_LOCAL;
mongoose.connect(DB,{
  useNewUrlParser: true,
  useUnifiedTopology:true,
  useCreateIndex:true,
  useFindAndModify:true
}).then(()=>console.log('DB Connected Successfully'))

// READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf8'));

// IMPORT DATA INTO DB
const importData = async () =>{
    try{
        await Tour.create(tours);
        console.log('Data Successfully loaded');
        process.exit();
    }catch(err){
        console.log(err);
    }
}

// DELETE ALL DATA FROM COLLECTION
const deleteData = async () => {
    try{
        await Tour.deleteMany();
        console.log('Data successfully deleted');
        process.exit();
    }catch(err){
        console.log(err);
    }
}

if(process.argv[2] == '--import'){
    importData();
}else if(process.argv[2] == '--delete'){
    deleteData();
}
console.log(process.argv);