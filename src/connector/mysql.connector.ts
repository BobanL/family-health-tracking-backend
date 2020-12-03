import mysql, { ResultSetHeader } from "mysql2/promise";

export const saveFamilyUnit = async (ssn1: number, ssn2: number) => {
  const queryResponse = await executeQuery(
    `INSERT INTO fam_unit (Parent1_SSN, Parent2_SSN) VALUES ('${ssn1}', '${ssn2}');`
  );
  return { id: (queryResponse[0] as ResultSetHeader).insertId };
};

export const saveFamilyMember = async (
  ssn: number,
  firstName: string,
  middleName: string,
  lastName: string,
  familyUnit: number | null,
  sex: string,
  birthDay: string,
  address: string
) => {
  return await executeQuery(
    `INSERT INTO family_member (SSN, Fname, Minit, Lname, Fam_unit, Sex, Bdate, Address) VALUES (${ssn}, '${firstName}', ${
      middleName ? "'" + middleName + "'" : null
    }, '${lastName}', ${familyUnit}, '${sex}', '${birthDay}', '${address}');`
  );
};

export const saveDoctor = async (
  doctorName: string,
  doctorLocation: string
) => {
  return await executeQuery(
    `INSERT INTO doctors (Dname, Dlocation) VALUES ('${doctorName}', '${doctorLocation}');`
  );
};

export const saveIllness = async (
  illnessName: string,
  medicationNumber: number,
  illnessDescription: string
) => {
  return await executeQuery(
    `INSERT INTO illness (Iname, Med_num, Idesc) VALUES ('${illnessName}', ${medicationNumber}, '${illnessDescription}');`
  );
};

export const saveMedication = async (
  medicineName: string,
  medicineType: string,
  medicineEffects: string
) => {
  return await executeQuery(`INSERT INTO medications (name, type, effects) VALUES ('${medicineName}', '${medicineType}', '${medicineEffects}');
`);
};

export const saveMedicalRecords = async (
  patientSSN: number,
  date: string,
  reason: string,
  illnessNumber: string,
  doctorNumber: number
) => {
  return await executeQuery(
    `INSERT INTO med_rec (SSN, Date, Reason, Diagnosis, Dnum) VALUES (${patientSSN}, '${date}', '${reason}', ${illnessNumber}, ${doctorNumber});`
  );
};

const connection = async () =>
  await mysql.createConnection({
    user: "root",
    password: "password",
    database: "health_tracking_system",
  });

const executeQuery = async (query: string) => {
  const mysqlConnection = await connection();
  const queryResponse = await mysqlConnection.execute(query);
  mysqlConnection.end();
  return queryResponse;
};
