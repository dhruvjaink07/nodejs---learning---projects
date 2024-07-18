/**
 * This are just like the events we have in Flutter Bloc they here maintain some state and then emit accordingly in the order in which they are declared and called
 */

const EventEmitter = require("events");
const http = require("http");
class Sales extends EventEmitter{
    constructor() {
        super();
    }
}

// const myEmitter = new EventEmitter();
const myEmitter = new Sales();

myEmitter.on("newSale", ()=>{
    console.log("There was a new sale!")
});

myEmitter.on("newSale", ()=>{
    console.log("Customer name: Jonas")
});

myEmitter.on("newSale", stock => console.log(`There are now ${stock} items left in the stock.`))
myEmitter.emit("newSale",9);






/////////////////////////////////////////////

const server = http.createServer((req, res) => {
    console.log("Request received");
    console.log("Another request");
    res.end("Request received!");
});

server.on('close', (req, res) => {
    res.end("Server Closed");
});

server.listen(8000, '127.0.0.1', () => {
    console.log("Waiting for request");
});
