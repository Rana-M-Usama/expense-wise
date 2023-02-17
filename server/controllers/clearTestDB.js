import httpStatus from "http-status";
import mongoose from "mongoose";

import asyncHandler from "../middlewares/async";

// @desc      Update password
// @route     PUT /api/v1/e2e/clear-test-db
// @access    Private
const clearDB = asyncHandler(async (req, res) => {
  await mongoose.connect("mongodb://localhost:27017/expensewise-test");
  await mongoose.connection.db.dropDatabase();

  res.status(httpStatus.OK).json({
    success: true,
    data: "Database cleared.",
  });
});

export default clearDB;
