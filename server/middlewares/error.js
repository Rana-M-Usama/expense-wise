/* eslint no-unused-vars: ["off", { "varsIgnorePattern": "next" }] */
import httpStatus from "http-status";
import mongoose from "mongoose";

import config from "../config/config";
import ErrorResponse from "../utils/errorResponse";
import logger from "../config/logger";

const { ValidationError } = mongoose.Document;

const errorHandler = (err, req, res, next) => {
  const { statusCode, message } = err;

  res.locals.errorMessage = err.message;

  const response = {
    success: false,
    statusCode,
    errors: message,

    ...(config.env === "development" && { stack: err.stack }),
  };

  if (config.env === "development") {
    logger.error(err);
  }

  res.status(statusCode).json({ ...response });
};

const errorConverter = (err, req, res, next) => {
  let error = err;
  const statusCode =
    error.statusCode ||
    (error instanceof mongoose.Error
      ? httpStatus.BAD_REQUEST
      : httpStatus.INTERNAL_SERVER_ERROR);

  const message = error.message || httpStatus[statusCode];

  if (!(error instanceof ErrorResponse)) {
    error = new ErrorResponse(message, statusCode);
  }

  if (err instanceof ValidationError) {
    const { errors } = err;
    const errorMessages = Object.keys(errors).map((key) => errors[key].message);

    return errorHandler(
      new ErrorResponse(errorMessages, statusCode),
      req,
      res,
      next,
    );
  }

  errorHandler(new ErrorResponse(message, statusCode), req, res, next);
};

export { errorConverter, errorHandler };
