import crypto from "crypto";
import httpStatus from "http-status";

import asyncHandler from "../../middlewares/async";
import ErrorResponse from "../../utils/errorResponse";
import sendEmail from "../../utils/sendEmail";
import sendTokenResponse from "../helpers/sendTokenResponse";
import User from "../../models/User";

// @desc      Update password
// @route     PUT /api/v1/auth/update-password
// @access    Private
const updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(
      new ErrorResponse("Password is incorrect.", httpStatus.UNAUTHORIZED),
    );
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, httpStatus.OK, res);
});

// @desc      Forgot password
// @route     POST /api/v1/auth/forgot-password
// @access    Public
const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(
      new ErrorResponse(
        "User with this email doesn't exist.",
        httpStatus.NOT_FOUND,
      ),
    );
  }

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host",
  )}/api/v1/auth/reset-password/${resetToken}`;

  const message =
    "You are receiving this email because you has requested the reset".concat(
      ` of a password. Make a PUT request to: \n\n ${resetUrl}`,
    );

  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      message,
    });

    res.status(httpStatus.OK).json({ success: true, data: "Email sent" });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(
      new ErrorResponse(
        "Email could not be sent",
        httpStatus.INTERNAL_SERVER_ERROR,
      ),
    );
  }
});

// @desc      Reset password
// @route     PUT /api/v1/auth/reset-password/:resettoken
// @access    Public
const resetPassword = asyncHandler(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    if (user.resetPasswordExpire < Date.now()) {
      return next(
        new ErrorResponse(
          "Expired password reset token, please generate a new one.",
          httpStatus.NOT_FOUND,
        ),
      );
    }
    return next(
      new ErrorResponse(
        "Invalid password reset token, please generate a new one.",
        httpStatus.NOT_FOUND,
      ),
    );
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, httpStatus.OK, res);
});

export { updatePassword, forgotPassword, resetPassword };
