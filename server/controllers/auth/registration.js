import axios from "axios";
import httpStatus from "http-status";

import asyncHandler from "../../middlewares/async";
import emailService from "../../utils/sendEmail";
import sendSessionResponse from "../helpers/sendSessionResponse";
import User from "../../models/User";

// @desc      Register user with google account
// @route     POST /api/v1/auth/google-register
// @access    Public
const googleRegister = asyncHandler(async (req, res) => {
  const { googleAccessToken } = req.body;

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

      let user = await User.findOne({ email });
      if (user) {
        return sendSessionResponse(user, httpStatus.OK, res, true);
      }

      user = await User.create({
        firstName,
        lastName,
        email,
        isGoogleUser: true,
      });

      sendSessionResponse(user, httpStatus.OK, res, true);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (email && (await User.findOne({ email }))) {
    return res.status(httpStatus.CONFLICT).json({
      success: false,
      errors: ["An account with that email address already exists"],
    });
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  sendSessionResponse(user, httpStatus.OK, res, false);
});

// @desc      Update user details
// @route     PUT /api/v1/auth/me
// @access    Private
const updateDetails = asyncHandler(async (req, res) => {
  const { firstName, lastName, imageUrl } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { firstName, lastName, imageUrl },
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(httpStatus.OK).json({
    success: true,
    data: user,
  });
});

export { googleRegister, register, updateDetails };
