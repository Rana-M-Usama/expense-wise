/* eslint no-unused-vars: ["off", { "varsIgnorePattern": "next" }] */
const mongoose = require("mongoose");
const httpStatus = require("http-status");
const config = require("../config/config");
const logger = require("../config/logger");
const ErrorResponse = require("../utils/errorResponse");

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
  const statusCode = error.statusCode || error instanceof mongoose.Error
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

module.exports = {
  errorConverter,
  errorHandler,
};
