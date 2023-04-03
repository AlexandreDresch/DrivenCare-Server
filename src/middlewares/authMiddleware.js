import errors from "../errors/errors.js";
import jwt from "jsonwebtoken";

import medicRepositories from "../repositories/medicRepositories.js";
import patientRepositories from "../repositories/patientRepositories.js";

async function authMedicValidation(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) throw errors.unauthorizedError();

  const parts = authorization.split(" ");
  if (parts.length !== 2) throw errors.unauthorizedError();

  const [schema, token] = parts;
  if (schema !== "Bearer") throw errors.unauthorizedError();

  jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
    try {
      if (error) throw errors.unauthorizedError();

      const {
        rows: [user],
      } = await medicRepositories.findById(decoded.userId);

      if (!user) throw errors.unauthorizedError();

      res.locals.user = user;

      next();
    } catch (error) {
      next(error);
    }
  });
}

async function authPatientValidation(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) throw errors.unauthorizedError();

  const parts = authorization.split(" ");
  if (parts.length !== 2) throw errors.unauthorizedError();

  const [schema, token] = parts;
  if (schema !== "Bearer") throw errors.unauthorizedError();

  jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
    try {
      if (error) throw errors.unauthorizedError();

      const {
        rows: [user],
      } = await patientRepositories.findById(decoded.userId);

      if (!user) throw errors.unauthorizedError();

      res.locals.user = user;

      next();
    } catch (error) {
      next(error);
    }
  });
}


export default { authMedicValidation, authPatientValidation };
