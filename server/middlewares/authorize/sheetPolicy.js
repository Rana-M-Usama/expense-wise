import httpStatus from "http-status";

import ErrorResponse from "../../utils/errorResponse";

const viewSheetPolicy = async (req, res, next) => {
  if (!req.sheet.hasViewPermission(req.user)) {
    return next(
      new ErrorResponse(
        "You are not authorized to access this sheet.",
        httpStatus.UNAUTHORIZED,
      ),
    );
  }

  next();
};

const editSheetPolicy = async (req, res, next) => {
  if (!req.sheet.hasEditPermission(req.user)) {
    return next(
      new ErrorResponse(
        "You are not authorized to edit this sheet.",
        httpStatus.UNAUTHORIZED,
      ),
    );
  }

  next();
};

const adminSheetPolicy = async (req, res, next) => {
  if (!req.sheet.hasAdminPermission(req.user)) {
    return next(
      new ErrorResponse(
        "You are not authorized for this action.",
        httpStatus.UNAUTHORIZED,
      ),
    );
  }

  next();
};

export { adminSheetPolicy, editSheetPolicy, viewSheetPolicy };
