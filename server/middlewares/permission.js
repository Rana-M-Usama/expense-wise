import httpStatus from "http-status";

import ErrorResponse from "../utils/errorResponse";
import isMongoId from "../utils/helpers";
import Permission from "../models/Permission";

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

export default findPermission;
