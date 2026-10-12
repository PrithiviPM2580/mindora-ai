//! ============================================================
//! 🚀 App — Application setup and configuration
//! ============================================================

import express, { type Express } from "express";
import { errorHandler } from "@/middlewares/error-handler.middleware";
import router from "@/routes/index.route";

//-- ------------------------------------------------------
//--  App : Application instance
//-- ------------------------------------------------------
const app: Express = express();

//-- ------------------------------------------------------
//--  Middlewares : Setup middlewares
//-- ------------------------------------------------------
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

//-- ------------------------------------------------------
//--  Router : Setup routes
//-- ------------------------------------------------------
app.use(router);

//-- ------------------------------------------------------
//--  Error Handler : Setup global error handler
//-- ------------------------------------------------------
app.use(errorHandler);

export default app;
