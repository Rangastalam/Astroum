import express from "express";
import cors from 'cors';
import composeRoutes from "./routes/compose.routes.js";

import data_router from "./routes/data.routes.js";
const app = express();
app.use(express.json());

// Middleware
app.use(cors());


// Routes

app.use("/api/data", data_router);
app.use("/api/compose", composeRoutes);

export default app;