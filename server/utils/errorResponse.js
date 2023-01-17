class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);

    if (!Array.isArray(message)) {
      this.message = [message];
    } else {
      this.message = message;
    }

    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorResponse;
