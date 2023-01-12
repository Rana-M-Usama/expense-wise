import { afterAll, beforeAll, beforeEach } from "@jest/globals";
import mongoose from "mongoose";

import config from "../../config/config";
import logger from "../../config/logger";

const setupTestDB = () => {
  beforeAll(async () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
      logger.info("Connected to test database");
    });
  });

  beforeEach(async () => {
    await Promise.all(
      Object.values(mongoose.connection.collections).map(async (collection) =>
        collection.deleteMany(),
      ),
    );
  });

  afterAll(async () => {
    logger.info("Disconnected from test database");
    await mongoose.disconnect();
  });
};

export default setupTestDB;
