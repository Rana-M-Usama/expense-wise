import httpStatus from "http-status";

import ErrorResponse from "../utils/errorResponse";

const isDeveloper = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    [, token] = req.headers.authorization.split(" ");
  }

  if (!token) {
    return next(
      new ErrorResponse(
        "Please provide an authentication token.",
        httpStatus.UNAUTHORIZED,
      ),
    );
  }

  if (token !== process.env.DEVELOPER_TOKEN) {
    return next(new ErrorResponse("Invalid token.", httpStatus.UNAUTHORIZED));
  }

  next();
};

export default isDeveloper;
