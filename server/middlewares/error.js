import mongoose from "mongoose";
import httpStatus from "http-status";

import config from "../config/config";
import logger from "../config/logger";
import ErrorResponse from "../utils/errorResponse";

const DEVELOPMENT = "development";
const PRODUCTION = "production";

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (config.env === PRODUCTION && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    success: false,
    statusCode,
    errors: [message],

    ...(config.env === DEVELOPMENT && { stack: err.stack }),
  };

  if (config.env === DEVELOPMENT) {
    logger.error(err);
  }

  res.status(statusCode).json({ response });
};

const errorConverter = (err, req, res, next) => {
  let error = err;
  const statusCode =
    error.statusCode || error instanceof mongoose.Error
      ? httpStatus.BAD_REQUEST
      : httpStatus.INTERNAL_SERVER_ERROR;

  const message = error.message || httpStatus[statusCode];

  if (!(error instanceof ErrorResponse)) {
    error = new ErrorResponse(message, statusCode);
  }

  errorHandler(
    new ErrorResponse(error.message || httpStatus[statusCode], statusCode),
    req,
    res,
  );
};

export { errorConverter, errorHandler };
