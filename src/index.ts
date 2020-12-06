import bodyParser from "body-parser";
import express from "express";
import {
  getBy,
  procedure,
  saveDoctor,
  saveFamilyMember,
  saveFamilyUnit,
  saveIllness,
  saveMedicalRecords,
  saveMedication,
} from "./connector/mysql.connector";
import cors from "cors";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// Post
app.post("/fam_unit", async (req, res) => {
  console.log(req.body);
  if (req.body.Parent1_SSN && req.body.Parent2_SSN) {
    try {
      const saved = await saveFamilyUnit(
        req.body.Parent1_SSN,
        req.body.Parent2_SSN
      );
      res.send(saved);
    } catch (error) {
      res.send(error);
    }
  } else {
    res.sendStatus(400);
  }
});

app.post("/family_member", async (req, res) => {
  if (
    req.body.SSN &&
    req.body.Fname &&
    req.body.Lname &&
    req.body.Sex &&
    req.body.Bdate &&
    req.body.Address
  ) {
    try {
      const saved = await saveFamilyMember(
        req.body.SSN,
        req.body.Fname,
        req.body.Minit || null,
        req.body.Lname,
        req.body.Fam_unit || null,
        req.body.Sex,
        req.body.Bdate,
        req.body.Address
      );
      res.send(saved);
    } catch (error) {
      res.send(error);
    }
  } else {
    res.sendStatus(400);
  }
});

app.post("/doctors", async (req, res) => {
  if (req.body.Dname && req.body.Dlocation) {
    try {
      const saved = await saveDoctor(req.body.Dname, req.body.Dlocation);
      res.send(saved);
    } catch (error) {
      res.send(error);
    }
  } else {
    res.sendStatus(400);
  }
});

app.post("/illness", async (req, res) => {
  if (req.body.Iname && req.body.Med_num && req.body.Idesc) {
    try {
      const saved = await saveIllness(
        req.body.Iname,
        req.body.Med_num,
        req.body.Idesc
      );
      res.send(saved);
    } catch (error) {
      res.send(error);
    }
  } else {
    res.sendStatus(400);
  }
});

app.post("/medications", async (req, res) => {
  if (req.body.name && req.body.type && req.body.effects) {
    try {
      const saved = await saveMedication(
        req.body.name,
        req.body.type,
        req.body.medicineEffects
      );
      res.send(saved);
    } catch (error) {
      res.send(error);
    }
  } else {
    res.sendStatus(400);
  }
});

app.post("/med_rec", async (req, res) => {
  if (
    req.body.SSN &&
    req.body.Date &&
    req.body.Reason &&
    req.body.I_num &&
    req.body.Dnum
  ) {
    try {
      const saved = await saveMedicalRecords(
        req.body.SSN,
        req.body.Date,
        req.body.Reason,
        req.body.I_num,
        req.body.Dnum
      );
      res.send(saved);
    } catch (error) {
      res.send(error);
    }
  } else {
    res.sendStatus(400);
  }
});

// Get
app.get("/get/:tableName/:field/:id", async (req, res) => {
  if (req.params.tableName && req.params.field && req.params.id) {
    const retrieved = await getBy(
      req.params.tableName,
      req.params.field,
      req.params.id
    );
    if (retrieved && retrieved[0]) {
      res.send(retrieved[0]);
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(400);
  }
});
app.post("/getBy/:procedureName", async (req, res) => {
  const params = req.body.params || "";
  const retrieved = await procedure(req.params.procedureName, params);
  if (retrieved && retrieved[0]) {
    res.send(retrieved[0]);
  } else {
    res.sendStatus(404);
  }
});
app.listen(3001, () => {});

export { app };
