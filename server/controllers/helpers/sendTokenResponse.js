const PRODUCTION = "production";

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      // converting days to ms and 24 * 60 * 60 * 1000 = 1 day
      Date.now() + process.env.JWT_COOKIE_EXPIRE_IN_DAYS * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === PRODUCTION) {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    data: { token },
  });
};

module.exports = sendTokenResponse;
