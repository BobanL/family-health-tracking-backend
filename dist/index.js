"use strict";
// import express from "express";
Object.defineProperty(exports, "__esModule", { value: true });
// const app = express();
// app.post("/addData", (req, res) => {
//   res.send("Helo WOrld");
// });
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
// app.listen(3001, () => {});
// export { app };
var world = "world";
function hello(word) {
    if (word === void 0) { word = world; }
    return "Hello " + world + "! ";
}
exports.hello = hello;
