//! ============================================================
//! 🔐 Environment — Environment variables and configuration
//! ============================================================

import path from "node:path";
import { config as loadEnv } from "dotenv";

//> -----------------------------------------------------------------
//> Fn:loadEnvironment() — Desc: Load environment variables from .env file
//> --------------------------------------------------------------------
export const loadEnvironment = () => loadEnv({ path: path.resolve(process.cwd(), ".env") });
