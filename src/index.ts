import bodyParser from "body-parser";
import express from "express";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/addData", (req, res) => {
  console.log(req.body);
  res.send("Helo WOrld");
});

app.listen(3001, () => {});

export { app };
