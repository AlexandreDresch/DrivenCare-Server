import medicServices from "../services/medicServices.js";

async function signup(req, res, next) {
  const { name, email, password, phone, crm, city, state } = req.body;
  try {
    await medicServices.signup({
      name,
      email,
      password,
      phone,
      crm,
      city,
      state,
    });
    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function signin(req, res, next) {
  const { email, password } = req.body;
  try {
    const token = await medicServices.signin({ email, password });
    return res.send({ token });
  } catch (err) {
    next(err);
  }
}

async function createMedicSpecialty(req, res, next) {
  const { specialty } = req.body;
  const { id } = res.locals.user;
  
  try {
    await medicServices.createSpecialty({ specialty, id });

    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
}

async function createWeeklyAvailability(req, res, next) {
  const weekData = req.body;
  const { id } = res.locals.user;
  
  try {
    await medicServices.createWeeklyAvailability(weekData, id);

    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
}

async function getAppointments(req, res, next) {
  const { id } = res.locals.user;

  try {
    const scheduledSummary = await medicServices.getScheduledSummary(id);

    return res.send(scheduledSummary);
  } catch (error) {
    next(error);
  }
}

async function confirmAppointment(req, res, next) {
  const { appointmentId, date, hour } = req.body;
  const { id } = res.locals.user;

  try {
    await medicServices.confirmAppointment(id, appointmentId, date, hour);

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}

async function cancelAppointment(req, res, next) {
  const { appointmentId } = req.body;
  const { id } = res.locals.user;

  try {
    await medicServices.cancelAppointment(id, appointmentId);

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}

async function getSummary(req, res, next) {
  const { id } = res.locals.user;

  try {
    data = await medicServices.getSummary(id);

    return res.send(data);
  } catch (error) {
    next(error);
  }
}

export default {
  signup,
  signin,
  createMedicSpecialty,
  createWeeklyAvailability,
  getAppointments,
  confirmAppointment,
  cancelAppointment,
  getSummary
};
