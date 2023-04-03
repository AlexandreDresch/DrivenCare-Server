import { Router } from "express";

import { validateSchema } from "../middlewares/schemaMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";

import { patientSchema } from "../schemas/Patient.js";

import patientControllers from "../controllers/patientControllers.js";

const patientsRoutes = Router();

patientsRoutes.post(
  "/signup",
  validateSchema(patientSchema),
  patientControllers.signup
);
patientsRoutes.post("/signin", patientControllers.signin);

patientsRoutes.get(
  "/medicbyname",
  authMiddleware.authPatientValidation,
  patientControllers.getMedicByName
);
patientsRoutes.get(
  "/medicbyspecialty",
  authMiddleware.authPatientValidation,
  patientControllers.getMedicBySpecialty
);
patientsRoutes.get(
  "/medicbycity",
  authMiddleware.authPatientValidation,
  patientControllers.getMedicByCity
);

patientsRoutes.post(
  "/schedule",
  authMiddleware.authPatientValidation,
  patientControllers.scheduleAppointment
);
patientsRoutes.get(
  "/scheduledsummary",
  authMiddleware.authPatientValidation,
  patientControllers.getScheduledSummary
);
patientsRoutes.get(
  "/summary",
  authMiddleware.authPatientValidation,
  patientControllers.getSummary
);

export default patientsRoutes;
