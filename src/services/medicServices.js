import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";

import "dotenv/config";

import medicRepositories from "../repositories/medicRepositories.js";

import errors from "../errors/errors.js";

async function signup({ name, email, password, phone, crm, city }) {
  const { rowCount } = await medicRepositories.findByEmail(email);
  if (rowCount) throw errors.duplicatedEmailError(email);

  const hashPassword = await bcrypt.hash(password, 10);
  await medicRepositories.create({
    name,
    email,
    password: hashPassword,
    phone,
    crm,
    city,
  });
}

async function signin({ email, password }) {
  const {
    rowCount,
    rows: [user],
  } = await medicRepositories.findByEmail(email);
  if (!rowCount) throw errors.invalidCredentialsError();

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw errors.invalidCredentialsError();

  const token = jwt.sign({ userId: user.id }, process.env.SECRET_JWT, {
    expiresIn: 86400,
  });

  return token;
}

async function createSpecialty({ specialty, id }) {
  await medicRepositories.updateMedicSpecialty(specialty, id);
}

async function createWeeklyAvailability(weekData, id) {
  await medicRepositories.updateMedicWeek(weekData, id);
}

async function getScheduledSummary(id) {
  const data = await medicRepositories.getScheduledSummary(id);
 
  return data;
 }

async function confirmAppointment(id, appointmentId, date, hour) {
  const formattedDate = dayjs(date, 'MM/DD/YYYY').day();

  await medicRepositories.confirmAppointment(id, appointmentId, date, formattedDate, hour);
}

async function cancelAppointment(id, appointmentId) {

  await medicRepositories.cancelAppointment(id, appointmentId);
}

async function getSummary(id) {

  const data = await medicRepositories.getSummary(id);

  return data;
}

export default {
  signup,
  signin,
  createSpecialty,
  createWeeklyAvailability,
  getScheduledSummary,
  confirmAppointment,
  cancelAppointment,
  getSummary
};
