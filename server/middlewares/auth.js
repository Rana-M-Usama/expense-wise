import httpStatus from "http-status";
import jwt from "jsonwebtoken";

import asyncHandler from "./async";
import ErrorResponse from "../utils/errorResponse";
import User from "../models/User";

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

    if (req.user === null) {
      return next(
        new ErrorResponse(
          "You need to be logged in first.",
          httpStatus.UNAUTHORIZED,
        ),
      );
    }

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return next(new ErrorResponse("Token expired.", httpStatus.UNAUTHORIZED));
    }

    if (err.name === "JsonWebTokenError") {
      return next(
        new ErrorResponse(
          "Please provide a valid token.",
          httpStatus.UNAUTHORIZED,
        ),
      );
    }

    return next(
      new ErrorResponse("An error occurred.", httpStatus.INTERNAL_SERVER_ERROR),
    );
  }
});

export default protect;
