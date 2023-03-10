import crypto from "crypto";
import fs from "fs";
import httpStatus from "http-status";
import { v4 } from "uuid";

import { deleteImage, uploadImage } from "../helpers/S3";
import asyncHandler from "../../middlewares/async";
import config from "../../config/config";
import emailService from "../../utils/sendEmail";
import ErrorResponse from "../../utils/errorResponse";
import { getGoogleUserData } from "../../utils/helpers";
import sendSessionResponse from "../helpers/sendSessionResponse";
import User from "../../models/User";

// @desc      Register user with google account
// @route     POST /api/v1/auth/google-register
// @access    Public
const googleRegister = asyncHandler(async (req, res, next) => {
  const { googleAccessToken } = req.body;

  if (!googleAccessToken) {
    return next(new ErrorResponse("Invalid access token.", 400));
  }

  const {
    given_name: firstName,
    family_name: lastName,
    email,
  } = await getGoogleUserData(googleAccessToken);
  const user = await User.findOne({ email });

  if (user) {
    sendSessionResponse(user, httpStatus.OK, res, true);
  }

  const newUser = await User.create({
    firstName,
    lastName,
    email,
    isGoogleUser: true,
    confirmed: true,
  });

  sendSessionResponse(newUser, httpStatus.OK, res, true);
});

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
const register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  if (email && (await User.findOne({ email }))) {
    return res.status(httpStatus.CONFLICT).json({
      success: false,
      errors: ["An account with that email address already exists."],
    });
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
      const message = `
                      <html>
                        <head>
                          <style>
                            p {
                              font-size: 16px;
                              line-height: 1.5;
                              margin-bottom: 16px;
                            }
                            
                            a {
                              color: #007bff;
                              text-decoration: underline;
                            }
                            
                            .signature {
                              margin-top: 32px;
                              font-style: italic;
                            }
                          </style>
                        </head>
                        <body>
                          <p>Dear ${firstName} ${lastName},</p>
                          <p>
                            Thank you for creating an account with ExpenseWise. 
                            To activate your account, 
                            please click on the following link:
                          </p>
                          <p>
                            <a href="${confirmEmailUrl}">${confirmEmailUrl}</a>
                          </p>
                          <p>If you did not create an account with ExpenseWise,
                           please ignore this email.
                           </p>
                          <p class="signature">Best regards,<br>ExpenseWise</p>
                        </body>
                      </html>
                    `;

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
const updateDetails = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, isDeletePhoto } = req.body;
  let imageUrl;
  let key;
  const record = await User.findById(req.user.id);
  if (record?.imageUrl) {
    key = record.imageUrl.split("/").pop();
  }

  if (isDeletePhoto) {
    try {
      await deleteImage(process.env.BUCKET_NAME, key);
      record.imageUrl = undefined;
      await record.save();
    } catch (error) {
      return next(
        new ErrorResponse("Failed to delete the image", httpStatus.BAD_REQUEST),
      );
    }
  }

  if (req.files?.[0]?.path) {
    if (key) {
      await deleteImage(process.env.BUCKET_NAME, key);
    }
    const data = fs.readFileSync(req.files[0].path);
    const { Location } = await uploadImage(process.env.BUCKET_NAME, v4(), data);
    imageUrl = Location;
  }

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

export { confirmEmail, googleRegister, register, updateDetails };
