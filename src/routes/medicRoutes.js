import { Router } from "express";

import medicControllers from "../controllers/medicControllers.js";

import { validateSchema } from "../middlewares/schemaMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";

import { medicSchema } from "../schemas/Medic.js";

const medicRoutes = Router();

medicRoutes.post(
  "/signup",
  validateSchema(medicSchema),
  medicControllers.signup
);
medicRoutes.post("/signin", medicControllers.signin);

medicRoutes.post(
  "/specialties",
  authMiddleware.authMedicValidation,
  medicControllers.createMedicSpecialty
);

medicRoutes.post(
  "/availability",
  authMiddleware.authMedicValidation,
  medicControllers.createWeeklyAvailability
);

medicRoutes.get(
  "/appointments",
  authMiddleware.authMedicValidation,
  medicControllers.getAppointments
);

medicRoutes.patch(
  "/appointment/confirm",
  authMiddleware.authMedicValidation,
  medicControllers.confirmAppointment
);
medicRoutes.patch(
  "/appointment/cancel",
  authMiddleware.authMedicValidation,
  medicControllers.cancelAppointment
);

medicRoutes.get(
  "/appointments/summary",
  authMiddleware.authMedicValidation,
  medicControllers.getSummary
);

export default medicRoutes;
