const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

// Protect routes
// eslint-disable-next-line consistent-return
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from Bearer token in header
    [, token] = req.headers.authorization.split(" ");
    // Set token from cookie
  }

  // Make sure token exists
  if (!token) {
    return next(
      new ErrorResponse(
        "Not authorized to access this route",
        httpStatus.UNAUTHORIZED,
      ),
    );
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return next(
      new ErrorResponse(
        "Not authorized to access this route",
        httpStatus.UNAUTHORIZED,
      ),
    );
  }
});
