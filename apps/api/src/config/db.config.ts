//! ============================================================
//! ⚙️ Config — Application configuration for databse connection
//! ============================================================

import type { ConnectOptions } from "mongoose";
import { appConfig } from "./app.config";

export const dbConfig = {
  dbName: appConfig?.DB_NAME,
  appName: appConfig?.APP_NAME,
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
  },
  maxPoolSize: 50,
  minPoolSize: 1,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  retryWrites: true,
} satisfies ConnectOptions;
