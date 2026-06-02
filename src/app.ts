import express from "express";
import routes from "./routes";
import cors from "cors";
import { swaggerSpec, swaggerUi } from "./config/swagger";

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(routes);

export default app;