import httpStatus from "http-status";

import asyncHandler from "../../middlewares/async";
import config from "../../config/config";
import ErrorResponse from "../../utils/errorResponse";
import { getGoogleUserData } from "../../utils/helpers";
import sendSessionResponse from "../helpers/sendSessionResponse";
import User from "../../models/User";

// @desc      Login user with google account
// @route     POST /api/v1/auth/google-login
// @access    Public
const googleLogin = asyncHandler(async (req, res, next) => {
  const { googleAccessToken } = req.body;

  if (!googleAccessToken) {
    return next(new ErrorResponse("Invalid access token.", 400));
  }

  const {
    given_name: firstName,
    family_name: lastName,
    email,
  } = await getGoogleUserData(googleAccessToken);
  let userExist = await User.findOne({ email });

  if (!userExist) {
    userExist = await User.create({
      firstName,
      lastName,
      email,
      isGoogleUser: true,
      confirmed: true,
    });
  }

  if (userExist && !userExist.confirmed) {
    userExist.confirmed = true;
    await userExist.save();
  }

  sendSessionResponse(userExist, httpStatus.OK, res, true);
});

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

  if (!user.confirmed && config.env === "production") {
    return next(
      new ErrorResponse(
        "Please verify your account first.",
        httpStatus.UNAUTHORIZED,
      ),
    );
  }

  sendSessionResponse(user, httpStatus.OK, res, true);
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

export { login, logout, getMe, googleLogin };
