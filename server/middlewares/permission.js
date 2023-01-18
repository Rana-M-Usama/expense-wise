import httpStatus from "http-status";

import ErrorResponse from "../utils/errorResponse";
import Permission from "../models/Permission";

const findPermission = async (req, res, next) => {
  req.permission = await Permission.findById(req.params.id);

  if (req.permission) {
    return next();
  }

  next(
    new ErrorResponse(
      `No permission found with the id of ${req.params.id}.`,
      httpStatus.NOT_FOUND,
    ),
  );
};

export default findPermission;
