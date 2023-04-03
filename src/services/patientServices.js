import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";

import "dotenv/config";

import patientRepositories from "../repositories/patientRepositories.js";

import errors from "../errors/errors.js";

async function signup({ name, email, password, phone }) {
  const { rowCount } = await patientRepositories.findByEmail(email);
  if (rowCount) throw errors.duplicatedEmailError(email);

  const hashPassword = await bcrypt.hash(password, 10);
  await patientRepositories.create({
    name,
    email,
    password: hashPassword,
    phone,
  });
}

async function signin({ email, password }) {
  const {
    rowCount,
    rows: [user],
  } = await patientRepositories.findByEmail(email);
  if (!rowCount) throw errors.invalidCredentialsError();

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw errors.invalidCredentialsError();

  const token = jwt.sign({ userId: user.id }, process.env.SECRET_JWT, {
    expiresIn: 86400,
  });

  return token;
}

async function getMedicByName(name) {
  const data = await patientRepositories.getMedicByName(name);

  return data;
}

async function getMedicBySpecialty(id) {
  const data = await patientRepositories.getMedicBySpecialty(id);

  return data;
}

async function getMedicByCity(city) {
  const data = await patientRepositories.getMedicByCity(city);

  return data;
}

async function scheduleAppointment(medicId, date, hour, id) {
  const formattedDate = dayjs().day(date).format("MM/DD/YYYY");

  await patientRepositories.scheduleAppointment(
    medicId,
    date,
    formattedDate,
    hour,
    id
  );
}

async function getScheduledSummary(id) {

 const data = await patientRepositories.getScheduledSummary(id);

 return data;
}

async function getSummary(id) {

  const data = await patientRepositories.getSummary(id);
 
  return data;
 }


export default {
  signup,
  signin,
  getMedicByName,
  getMedicBySpecialty,
  getMedicByCity,
  scheduleAppointment,
  getScheduledSummary,
  getSummary
};
