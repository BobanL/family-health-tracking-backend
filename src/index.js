import express from "express";
const app = express();
app.post("/addData", (req, res) => {
    res.send("Helo WOrld");
});
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(3001, () => { });
export { app };
