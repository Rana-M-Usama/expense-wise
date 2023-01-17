import httpStatus from "http-status";

import ErrorResponse from "../../utils/errorResponse";

const viewPolicy = async (req, res, next) => {
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

const editPolicy = async (req, res, next) => {
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

const adminPolicy = async (req, res, next) => {
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

export { adminPolicy, editPolicy, viewPolicy };
