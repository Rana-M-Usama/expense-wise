import crypto from "crypto";
import httpStatus from "http-status";

import asyncHandler from "../../middlewares/async";
import config from "../../config/config";
import emailService from "../../utils/sendEmail";
import ErrorResponse from "../../utils/errorResponse";
import sendSessionResponse from "../helpers/sendSessionResponse";
import User from "../../models/User";

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
const register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (email && (await User.findOne({ email }))) {
    return res
      .status(httpStatus.CONFLICT)
      .json({ success: false, errors: ["Email already in use."] });
  }

  const token = crypto.randomBytes(20).toString("hex");
  const confirmEmailToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    confirmEmailToken,
  });

  if (config.env === "production") {
    try {
      const confirmEmailUrl = `${req.get("origin")}/confirm-email/${token}`;
      const message =
        `Welcome ${firstName} ${lastName}!. Please confirm your email `.concat(
          `by clicking on the given link: \n\n ${confirmEmailUrl}`,
        );

      await emailService.sendEmail({
        email: user.email,
        subject: "Email Confirmation",
        message,
      });
    } catch (err) {
      await user.remove();
      return next(
        new ErrorResponse(
          "Email could not be sent",
          httpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    }
  }

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

// @desc      Confirm Email
// @route     PUT /api/v1/auth/confirm-email/:confirmEmailToken
// @access    Public
const confirmEmail = asyncHandler(async (req, res, next) => {
  const confirmEmailToken = crypto
    .createHash("sha256")
    .update(req.params.confirmEmailToken)
    .digest("hex");

  const user = await User.findOne({
    confirmEmailToken,
  });

  if (!user) {
    return next(
      new ErrorResponse(
        "Invalid confirm email token. Please sign up again.",
        httpStatus.NOT_FOUND,
      ),
    );
  }

  user.confirmed = true;
  user.confirmEmailToken = undefined;
  await user.save();

  sendSessionResponse(user, httpStatus.OK, res, false);
});

export { confirmEmail, register, updateDetails };
