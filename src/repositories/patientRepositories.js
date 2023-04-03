import { connectionDb } from "../config/database.js";

async function findByEmail(email) {
  return await connectionDb.query(
    `    
      SELECT * FROM patients WHERE email=$1
    `,
    [email]
  );
}

async function create({ name, email, password, phone }) {
  await connectionDb.query(
    `
          INSERT INTO patients (name, email, password, phone)
          VALUES ($1, $2, $3, $4)
      `,
    [name, email, password, phone]
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
      SELECT * FROM patients WHERE id=$1
    `,
    [id]
  );
}

async function getMedicByName(name) {

  const data = await connectionDb.query(
    `
    SELECT m.name AS medic_name, m.city, m.phone, m.id,
       array_agg(DISTINCT s.name) AS specialties, 
       array_agg(DISTINCT jsonb_build_object('week_day', at.week_day, 'start_time', at.start_time, 'end_time', at.end_time)) AS availability
    FROM medics m
      INNER JOIN medic_specialty ms ON m.id = ms.id_medic
      INNER JOIN specialties s ON ms.id_specialty = s.id
      LEFT JOIN available_times at ON m.id = at.medic_id
    WHERE m.name = $1
    GROUP BY m.id;
    `, [name]
  )
  return data.rows;
}

async function getMedicBySpecialty(specialtyId) {

  const data = await connectionDb.query(
    `
    SELECT
      medics.name AS medic_name,
      medics.id,
      medics.city,
      medics.phone,
      json_agg(
          json_build_object(
              'week_day', available_times.week_day,
              'start_time', available_times.start_time,
              'end_time', available_times.end_time
          ) ORDER BY available_times.week_day, available_times.start_time
      ) AS availability
    FROM
      medics
      INNER JOIN medic_specialty ON medics.id = medic_specialty.id_medic
      INNER JOIN available_times ON medics.id = available_times.medic_id
    WHERE
      medic_specialty.id_specialty = $1
    GROUP BY
      medics.id
    ORDER BY
      medics.name;
    `, [specialtyId]
  )
  return data.rows;
}

async function getMedicByCity(city) {

  const data = await connectionDb.query(
    `
    SELECT m.name AS medic_name, m.city, m.phone, m.id, 
       array_agg(DISTINCT s.name) AS specialties, 
       array_agg(DISTINCT jsonb_build_object('week_day', at.week_day, 'start_time', at.start_time, 'end_time', at.end_time)) AS availability
    FROM medics m
      INNER JOIN medic_specialty ms ON m.id = ms.id_medic
      INNER JOIN specialties s ON ms.id_specialty = s.id
      LEFT JOIN available_times at ON m.id = at.medic_id
    WHERE m.city = $1
    GROUP BY m.id;
    `, [city]
  )
  return data.rows;
}

async function scheduleAppointment(medicId, date, formattedDate, hour, id) {
  await connectionDb.query(
    `
          INSERT INTO appointments (date, hour, medic_id, patient_id)
          VALUES ($1, $2, $3, $4)
      `,
    [formattedDate, hour, medicId, id]
  );

  
}

async function getScheduledSummary(id) {
  
  const data = await connectionDb.query(
    `
    SELECT medics.name AS medic_name, medics.city, medics.phone, appointments.date, appointments.hour AS time
    FROM appointments
    JOIN medics ON appointments.medic_id = medics.id
    WHERE appointments.patient_id = $1
    AND appointments.canceled = false
    AND appointments.done = false;
    
      `,
    [id]
  );

  return data.rows;
}

async function getSummary(id) {
  
  const data = await connectionDb.query(
    `
    SELECT medics.name AS medic_name, medics.city, medics.phone, appointments.date, appointments.hour AS time
    FROM appointments
    JOIN medics ON appointments.medic_id = medics.id
    WHERE appointments.patient_id = $1
    AND appointments.canceled = false
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
  getMedicByName,
  getMedicBySpecialty,
  getMedicByCity,
  scheduleAppointment,
  getScheduledSummary,
  getSummary
};
