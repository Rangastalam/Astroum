import express from "express";

import {data_lookup} from "../controllers/data.controller.js";

const  data_router= express.Router();

data_router.get("/",data_lookup);


export default data_router;