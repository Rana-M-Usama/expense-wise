const mongoose = require("mongoose");
const httpStatus = require("http-status");
const config = require("../config/config");
const logger = require("../config/logger");
const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res) => {
  let { statusCode, message } = err;
  if (config.env === "production" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    success: false,
    code: statusCode,
    message,

    ...(config.env === "development" && { stack: err.stack }),
  };

  if (config.env === "development") {
    logger.error(err);
  }

  res.status(statusCode).json({ response });
};

const errorConverter = (err, req, res) => {
  let error = err;
  const statusCode =
    error.statusCode || error instanceof mongoose.Error
      ? httpStatus.BAD_REQUEST
      : httpStatus.INTERNAL_SERVER_ERROR;

  if (!(error instanceof ErrorResponse)) {
    const message = error.message || httpStatus[statusCode];
    error = new ErrorResponse(statusCode, message, false, err.stack);
  }

  errorHandler(
    new ErrorResponse(error.message || httpStatus[statusCode], statusCode),
    req,
    res,
  );
};

module.exports = {
  errorConverter,
  errorHandler,
};
