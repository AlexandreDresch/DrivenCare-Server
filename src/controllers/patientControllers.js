import patientServices from "../services/patientServices.js";

async function signup(req, res, next) {
  const { name, email, password, phone } = req.body;
  try {
    await patientServices.signup({
      name,
      email,
      password,
      phone
    });
    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function signin(req, res, next) {
  const { email, password } = req.body;
  try {
    const token = await patientServices.signin({ email, password });
    return res.send({ token });
  } catch (err) {
    next(err);
  }
}

async function getMedicByName(req, res, next) {
  const { name } = req.body;

  try {
    const medicData = await patientServices.getMedicByName(name);

    return res.send(medicData);
  } catch (error) {
    next(error);
  }
}

async function getMedicBySpecialty(req, res, next) {
  const { id } = req.body;

  try {
    const medicData = await patientServices.getMedicBySpecialty(id);

    return res.send(medicData);
  } catch (error) {
    next(error);
  }
}

async function getMedicByCity(req, res, next) {
  const { city } = req.body;

  try {
    const medicData = await patientServices.getMedicByCity(city);

    return res.send(medicData);
  } catch (error) {
    next(error);
  }
}

async function scheduleAppointment(req, res, next) {
  const { medicId, date, hour } = req.body;
  const { id } = res.locals.user;

  try {
    await patientServices.scheduleAppointment(medicId, date, hour, id);

    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
}

async function getScheduledSummary(req, res, next) {
  const { id } = res.locals.user;

  try {
    const scheduledSummary = await patientServices.getScheduledSummary(id);

    return res.send(scheduledSummary);
  } catch (error) {
    next(error);
  }
}

async function getSummary(req, res, next) {
  const { id } = res.locals.user;

  try {
    const data = await patientServices.getSummary(id);

    return res.send(data);
  } catch (error) {
    next(error);
  }
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
