import bodyParser from "body-parser";
import express from "express";
import {
  getBy,
  saveDoctor,
  saveFamilyMember,
  saveFamilyUnit,
  saveIllness,
  saveMedicalRecords,
  saveMedication,
} from "./connector/mysql.connector";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Post
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
      await saveFamilyMember(
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
    res.sendStatus(400);
  }
});

app.post("/doctor", async (req, res) => {
  if (req.body.doctorName && req.body.doctorLocation) {
    try {
      await saveDoctor(req.body.doctorName, req.body.doctorLocation);
      res.sendStatus(200);
    } catch (error) {
      res.send(error);
    }
  } else {
    res.sendStatus(400);
  }
});

app.post("/illness", async (req, res) => {
  if (
    req.body.illnessName &&
    req.body.medicationNumber &&
    req.body.illnessDescription
  ) {
    try {
      await saveIllness(
        req.body.illnessName,
        req.body.medicationNumber,
        req.body.illnessDescription
      );
      res.sendStatus(200);
    } catch (error) {
      res.send(error);
    }
  } else {
    res.sendStatus(400);
  }
});

app.post("/medication", async (req, res) => {
  if (
    req.body.medicineName &&
    req.body.medicineType &&
    req.body.medicineEffects
  ) {
    try {
      await saveMedication(
        req.body.medicineName,
        req.body.medicineType,
        req.body.medicineEffects
      );
      res.sendStatus(200);
    } catch (error) {
      res.send(error);
    }
  } else {
    res.sendStatus(400);
  }
});

app.post("/medicalRecords", async (req, res) => {
  if (
    req.body.patientSSN &&
    req.body.date &&
    req.body.reason &&
    req.body.illnessNumber &&
    req.body.doctorNumber
  ) {
    try {
      await saveMedicalRecords(
        req.body.patientSSN,
        req.body.date,
        req.body.reason,
        req.body.illnessNumber,
        req.body.doctorNumber
      );
      res.sendStatus(200);
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
app.listen(3001, () => {});

export { app };
