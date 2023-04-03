import { Router } from "express";

import patientsRoutes from "./patientsRoutes.js";
import medicRoutes from "./medicRoutes.js";

const routes = Router();

routes.use("/patient", patientsRoutes);
routes.use("/medic", medicRoutes);

export default routes;