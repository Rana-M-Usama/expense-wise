import httpStatus from "http-status";

import asyncHandler from "../../middlewares/async";
import sendSessionResponse from "../helpers/sendSessionResponse";
import User from "../../models/User";

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (email && (await User.findOne({ email }))) {
    return res
      .status(httpStatus.CONFLICT)
      .json({ success: false, errors: ["Email already in use."] });
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

export { register, updateDetails };
