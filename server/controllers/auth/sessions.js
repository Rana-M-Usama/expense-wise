const httpStatus = require("http-status");

const ErrorResponse = require("../../utils/errorResponse");
const asyncHandler = require("../../middlewares/async");
const User = require("../../models/User");
const sendTokenResponse = require("../helpers/sendTokenResponse");

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new ErrorResponse("Please provide an email and password.", 400),
    );
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(
      new ErrorResponse("Invalid credentials.", httpStatus.UNAUTHORIZED),
    );
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(
      new ErrorResponse("Invalid credentials.", httpStatus.UNAUTHORIZED),
    );
  }

  sendTokenResponse(user, httpStatus.OK, res);
});

// @desc      Log user out / clear cookie
// @route     GET /api/v1/auth/logout
// @access    Private
exports.logout = asyncHandler(async (req, res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(httpStatus.OK).json({
    success: true,
    data: {},
  });
});

// @desc      Get current logged in user
// @route     POST /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(httpStatus.OK).json({
    success: true,
    data: user,
  });
});
