import express from "express";

import { composeContext } from "../controllers/compose.controller.js";

const composeRoutes = express.Router();

composeRoutes.post("/", composeContext);

export default composeRoutes;