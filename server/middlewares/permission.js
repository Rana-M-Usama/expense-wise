import httpStatus from "http-status";

import ErrorResponse from "../utils/errorResponse";
import { isMongoId } from "../utils/helpers";
import Permission from "../models/Permission";
import User from "../models/User";

const findPermission = async (req, res, next) => {
  const { id } = req.params;

  if (!isMongoId(id)) {
    return next(
      new ErrorResponse("Invalid permission id.", httpStatus.BAD_REQUEST),
    );
  }

  req.permission = await Permission.findById(id);

  if (req.permission) {
    return next();
  }

  next(
    new ErrorResponse(
      `No permission found with the id of ${id}.`,
      httpStatus.NOT_FOUND,
    ),
  );
};

const findUserWithEmail = async (req, res, next) => {
  req.body.user = await User.findOne({ email: req.body.userEmail });

  if (!req.body.user) {
    next(
      new ErrorResponse(
        `User not found with this email: ${req.body.userEmail}.`,
        httpStatus.NOT_FOUND,
      ),
    );
  }

  next();
};

export { findPermission, findUserWithEmail };
