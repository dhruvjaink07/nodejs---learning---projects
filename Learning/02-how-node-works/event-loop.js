// This code is fully based on the event loop architecture's understanding
/*
as the flow says the the settimeouts will be executed first the the 
I/O operations will be performed and after completion of each phase when there is any micro-task left like procecc.nextTick() then it will be executed to be continued to next phase
*/

const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();

process.env.UV_THREADPOOL_SIZE = 3;

setTimeout(() => {
  console.log("Hello from timeout");
}, 0);

setImmediate(() => {
  console.log("This is Immediate 1");
});

fs.readFile("test-file.txt", () => {
  console.log("IO finished");
  console.log("---------------------");

  setTimeout(() => {
    console.log("Set Timeout 2");
  }, 0);
  setImmediate(() => {
    console.log("this is Immediate 2");
  });
  setTimeout(() => {
    console.log("3rd Set Timeout");
  }, 3000);
  process.nextTick(() => {
    console.log("Process.nextTick");
  });

  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "Password Encrypted");
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password Encrypted");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password Encrypted");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password Encrypted");
  });
});

console.log("Hello from top-level code");
