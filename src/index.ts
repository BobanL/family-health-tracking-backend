import bodyParser from "body-parser";
import express from "express";
import { saveFamilyMember, saveFamilyUnit } from "./connector/mysql.connector";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/familyUnit", async (req, res) => {
  if (req.body.ssn1 && req.body.ssn2) {
    const saved = await saveFamilyUnit(req.body.ssn1, req.body.ssn2);
    console.log(saved);
    res.send(saved);
  }
});

app.post("/familyMember", async (req, res) => {
  if (
    req.body.ssn &&
    req.body.firstName &&
    req.body.lastName &&
    req.body.sex &&
    req.body.birthDay &&
    req.body.address
  ) {
    try {
      const saved = await saveFamilyMember(
        req.body.ssn,
        req.body.firstName,
        req.body.middleName || null,
        req.body.lastName,
        req.body.familyUnit || null,
        req.body.sex,
        req.body.birthDay,
        req.body.address
      );
      res.sendStatus(200);
    } catch (error) {
      res.send(error);
    }
  } else {
    res.sendStatus(404);
  }
});

app.listen(3001, () => {});

export { app };
