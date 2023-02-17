import mongoose from "mongoose";

import app from "./app";
import config from "./config/config";
import logger from "./config/logger";

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info(`Connected to MongoDB->${config.mongoose.url}`);
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
    });
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
