import axios from "axios";
import httpStatus from "http-status";

import asyncHandler from "../../middlewares/async";
import ErrorResponse from "../../utils/errorResponse";
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
  axios
    .get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${googleAccessToken}`,
      },
    })
    .then(async (response) => {
      const firstName = response.data.given_name;
      const lastName = response.data.family_name;
      const { email } = response.data;

      const userExist = await User.findOne({ email });

      if (!userExist) {
        const user = await User.create({
          firstName,
          lastName,
          email,
          isGoogleUser: true,
        });

        sendSessionResponse(user, httpStatus.OK, res, true);
      }

      sendSessionResponse(userExist, httpStatus.OK, res, true);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
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
