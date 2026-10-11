//! ============================================================
//! 🌐 Server — HTTP server bootstrap
//! ============================================================

import { appConfig } from "@/config/app.config";
import { connectToDatabase, gracefulShutdown } from "@/db/connection.db";
import { logger } from "@/utils/logger.util";
import app from "./app";

const PORT = appConfig.PORT || 3000;

const startServer = async () => {
  try {
    await connectToDatabase();

    const server = app.listen(PORT, () => {
      logger.info(`Server is running in env [${appConfig.NODE_ENV}] in http://localhost:${PORT}`, {
        label: "Server",
      });
    });

    process.on("unhandledRejection", async (reason, promise) => {
      logger.error("Unhandled Rejection at:", { label: "Server", reason, promise });
      await gracefulShutdown(server);
      process.exit(1);
    });

    process.on("uncaughtException", async (error) => {
      logger.error("Uncaught Exception:", { label: "Server", error });
      await gracefulShutdown(server);
      process.exit(1);
    });

    process.on("SIGTERM", async () => {
      logger.info("SIGTERM signal received: closing HTTP server", { label: "Server" });
      await gracefulShutdown(server);
      process.exit(0);
    });

    process.on("SIGINT", async () => {
      logger.info("SIGINT signal received: closing HTTP server", { label: "Server" });
      await gracefulShutdown(server);
      process.exit(0);
    });
  } catch (error) {
    logger.error("Error starting server:", { label: "Server", error });
    process.exit(1);
  }
};

startServer();
