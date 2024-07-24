const express = require('express');

const app = express();

app.use(express.json())

app.get('/fetchData',(req,res)=>{
    res.status(200).json({status:"success",data:{
        message: "Data Fetched",
        values:  [1,2,3,4,5]
    }});
});

app.post('/addData',(req,res)=>{
    
});

const port = 5000;

app.listen(port,()=>{
    console.log(`Server Listening on port ${port}`);
});