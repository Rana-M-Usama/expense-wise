const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");

const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

exports.protect = asyncHandler(async (req, res, next) => {
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
  } catch (err) {
    return next(
      new ErrorResponse(
        "Something went wrong.",
        httpStatus.INTERNAL_SERVER_ERROR,
      ),
    );
  }
});
