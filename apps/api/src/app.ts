//! ============================================================
//! 🚀 App — Application setup and configuration
//! ============================================================

import cookieParser from "cookie-parser";
import express, { type Express } from "express";
import passport from "@/config/passport.config";
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
app.use(cookieParser());
app.use(passport.initialize());
//-- ------------------------------------------------------
//--  Router : Setup routes
//-- ------------------------------------------------------
app.use(router);

//-- ------------------------------------------------------
//--  Error Handler : Setup global error handler
//-- ------------------------------------------------------
app.use(errorHandler);

export default app;
