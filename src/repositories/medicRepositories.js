import { connectionDb } from "../config/database.js";

async function findByEmail(email) {
  return await connectionDb.query(
    `    
      SELECT * FROM medics WHERE email=$1
    `,
    [email]
  );
}

async function create({ name, email, password, phone, crm, city }) {
  await connectionDb.query(
    `
          INSERT INTO medics (name, email, password, phone, crm, city)
          VALUES ($1, $2, $3, $4, $5, $6)
      `,
    [name, email, password, phone, crm, city]
  );
}

async function createSession({ token, userId }) {
  await connectionDb.query(
    `
          INSERT INTO sessions (token, "userId")
          VALUES ($1, $2)
      `,
    [token, userId]
  );
}

async function findSessionByToken(token) {
  return await connectionDb.query(
    `
          SELECT * FROM sessions WHERE token = $1
      `,
    [token]
  );
}

async function findById(id) {
  return await connectionDb.query(
    `    
      SELECT * FROM medics WHERE id=$1
    `,
    [id]
  );
}

async function updateMedicSpecialty(specialtyId, medicId) {
  await connectionDb.query(
    `
    INSERT INTO medic_specialty (id_medic, id_specialty) VALUES ($1, $2);
    `,
    [medicId, specialtyId]
  );
}

async function updateMedicWeek(weekData, id) {
  weekData.forEach(async (item) => {
    const { week_day, start_time, end_time } = item;

    await connectionDb.query(
      `
      INSERT INTO available_times (medic_id, week_day, start_time, end_time)
      VALUES ($1, $2, $3, $4)
      `,
      [id, week_day, start_time, end_time]
    );
  });
}

async function getScheduledSummary(id) {
  const data = await connectionDb.query(
    `
    SELECT patients.name AS patient_name, patients.phone, appointments.date, appointments.hour AS time
    FROM appointments
    JOIN patients ON appointments.patient_id = patients.id
    WHERE appointments.medic_id = $1
    AND appointments.canceled = false
    AND appointments.done = false;    
      `,
    [id]
  );

  return data.rows;
}

async function confirmAppointment(id, appointmentId, date, formattedDate, hour) {
  await connectionDb.query(
    `
    UPDATE appointments
    SET confirmed = true
    WHERE id = $1
    AND medic_id = $2;    
      `,
    [appointmentId, id]
  );

  await connectionDb.query(
    `
    DELETE FROM available_times
    WHERE medic_id = $1
    AND week_day = $2
    AND start_time = $3;
    `, [id, date, hour]
  )

  await connectionDb.query(
    `
    UPDATE appointments
    SET canceled = true
    WHERE confirmed = false AND date = $1 AND hour = $2;
    
      `,
    [formattedDate, hour]
  );
}

async function cancelAppointment(id, appointmentId) {
  await connectionDb.query(
    `
    UPDATE appointments
    SET canceled = true
    WHERE id = $1
    AND medic_id = $2;    
      `,
    [appointmentId, id]
  );
}

async function getSummary(id) {
  const data = await connectionDb.query(
    `
    SELECT patients.name AS patient_name, patients.phone, appointments.date, appointments.hour AS time
    FROM appointments
    JOIN patients ON appointments.patient_id = patients.id
    WHERE appointments.medic_id = $1
    AND appointments.done = true;    
      `,
    [id]
  );

  return data.rows;
}

export default {
  findByEmail,
  create,
  createSession,
  findById,
  findSessionByToken,
  updateMedicSpecialty,
  updateMedicWeek,
  getScheduledSummary,
  confirmAppointment,
  cancelAppointment,
  getSummary
};
