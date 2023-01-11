import httpStatus from "http-status";

import asyncHandler from "../../middlewares/async";
import ErrorResponse from "../../utils/errorResponse";
import sendTokenResponse from "../helpers/sendTokenResponse";
import User from "../../models/User";

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
const login = asyncHandler(async (req, res, next) => {
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
const logout = asyncHandler(async (req, res) => {
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
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(httpStatus.OK).json({
    success: true,
    data: user,
  });
});

export { login, logout, getMe };
