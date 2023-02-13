import httpStatus from "http-status";

import ErrorResponse from "../../utils/errorResponse";

const permissionPolicy = async (req, res, next) => {
  if (req.permission.sheet.equals(req.sheet._id)) {
    return next();
  }

  next(
    new ErrorResponse(
      "You can't access this permission.",
      httpStatus.BAD_REQUEST,
    ),
  );
};

const grantPermissionPolicy = async (req, res, next) => {
  if (req.sheet.canGrantPermission(req.user, req.body.type)) {
    return next();
  }

  next(
    new ErrorResponse(
      "You do not have rights to assign this permission.",
      httpStatus.BAD_REQUEST,
    ),
  );
};

export { grantPermissionPolicy, permissionPolicy };
