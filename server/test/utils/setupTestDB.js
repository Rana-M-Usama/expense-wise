import mongoose from "mongoose";
import { beforeAll, beforeEach, afterAll } from "@jest/globals";
import config from "../../config/config";
import logger from "../../config/logger";

const setupTestDB = () => {
  beforeAll(async () => {
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
    await mongoose.disconnect();
  });
};

export default setupTestDB;
