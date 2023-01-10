const httpStatus = require("http-status");

const asyncHandler = require("../../middlewares/async");
const User = require("../../models/User");
const sendTokenResponse = require("../helpers/sendTokenResponse");

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res) => {
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

  sendTokenResponse(user, httpStatus.OK, res);
});

// @desc      Update user details
// @route     PUT /api/v1/auth/update-details
// @access    Private
exports.updateDetails = asyncHandler(async (req, res) => {
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
