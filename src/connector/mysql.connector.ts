import mysql, { ResultSetHeader } from "mysql2/promise";

const connection = async () =>
  await mysql.createConnection({
    user: "root",
    password: "password",
    database: "health_tracking_system",
  });

export const saveFamilyUnit = async (ssn1: number, ssn2: number) => {
  const mysqlConnection = await connection();
  const queryResponse = await mysqlConnection.execute(
    `INSERT INTO fam_unit (FAM_Unum, Parent1_SSN, Parent2_SSN) VALUES (NULL, '${ssn1}', '${ssn2}');`
  );
  mysqlConnection.end();
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
  const mysqlConnection = await connection();
  const queryResponse = await mysqlConnection.execute(
    `INSERT INTO family_member (SSN, Fname, Minit, Lname, Fam_unit, Sex, Bdate, Address) VALUES ('${ssn}', '${firstName}', ${
      middleName ? "'" + middleName + "'" : null
    }, '${lastName}', ${familyUnit}, '${sex}', '${birthDay}', '${address}');`
  );

  mysqlConnection.end();
  return queryResponse;
};
