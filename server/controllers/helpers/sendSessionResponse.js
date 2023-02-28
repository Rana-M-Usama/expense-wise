const sendSessionResponse = (user, statusCode, res, isToken) => {
  const token = user.getSignedJwtToken();
  const userData = {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    imageUrl: user.imageUrl,
    isGoogleUser: user.isGoogleUser,
  };

  const options = {
    expires: new Date(
      // converting days to ms and 24 * 60 * 60 * 1000 = 1 day
      Date.now() + process.env.JWT_COOKIE_EXPIRE_IN_DAYS * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      data: isToken
        ? {
          user: userData,
          token,
        }
        : {
          user: userData,
        },
    });
};

export default sendSessionResponse;
