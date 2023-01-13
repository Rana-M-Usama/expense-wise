import httpStatus from "http-status";
import jwt from "jsonwebtoken";

import asyncHandler from "./async";
import ErrorResponse from "../utils/errorResponse";
import User from "../models/User";

const { JsonWebTokenError, TokenExpiredError } = jwt;
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    [, token] = req.headers.authorization.split(" ");
  }

  if (!token) {
    return next(
      new ErrorResponse(
        "Please provide authentication token.",
        httpStatus.UNAUTHORIZED,
      ),
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    next();
  } catch (e) {
    let message;
    let code;

    if (e instanceof TokenExpiredError) {
      message = "Token expired.";
      code = httpStatus.UNAUTHORIZED;
    } else if (e instanceof JsonWebTokenError) {
      message = "Please provide a valid token.";
      code = httpStatus.UNAUTHORIZED;
    } else {
      message = "An error occurred.";
      code = httpStatus.INTERNAL_SERVER_ERROR;
    }

    return next(new ErrorResponse(message, code));
  }
});

export default protect;
