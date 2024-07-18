const fs = require("fs");
const server = require("http").createServer();


server.on("request", (req,res)=>{
// Solution 1
//     fs.readFile('small-testfile.txt',(data,err)=>{
//     if(err) console.log(err);
//     res.end(data)
//     });

// Solution 2 - Streams
// const readable = fs.createReadStream('test-file.txt');
// readable.on('data',chunk=>{
//     res.write(chunk);
// })

// readable.on("end",()=>{
//     console.log("Response completed");
//     res.end();
// })

// readable.on("error", err=>{
//     console.log(err);
//     res.statusCode =500;
//     res.end("File not found");
// })

// Solution 3 - As the speed of readable stream is much much faster than the writable stream of response which will cause the issue now this problem is called back pressure
const readable = fs.createReadStream('test-file.txt');
readable.pipe(res);
// readableSource.pipe(writableDest) so pipe method automatically solves the problem of backpressure
});


server.listen(8000,'127.0.0.1',()=>{
    console.log("Server Listening on Port number 8000");
})