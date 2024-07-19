// console.log(arguments);
// console.log(require("module").wrapper)

// module.exports
const C = require('./test-module')
const calci1 = new C();
console.log(calci1.add(2,5));

// exports
// const calci2 = require('./test-module-2')
// console.log(calci1.multiply(2,6))

const {add, multiply, divide} = require('./test-module-2')
console.log(multiply(2,6))

// caching
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();