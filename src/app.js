import "express-async-errors";
import express from "express";
import cors from "cors";

import routes from "./routes/index.js";
import { handleApplicationErrors } from "./middlewares/handleApplicationErrors.js";

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(handleApplicationErrors);

app.listen(port, () => console.log(`Server listening on ${port}`));