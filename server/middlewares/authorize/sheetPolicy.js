import httpStatus from "http-status";

import ErrorResponse from "../../utils/errorResponse";
import Permission from "../../models/Permission";

const sheetPolicy = async (req, res, next) => {
  req.user.permission = await Permission.findOne({
    sheet: req.sheet,
    user: req.user.id,
  });

  if (req.user.permission) {
    return next();
  }

  next(
    new ErrorResponse(
      "You are not authorized for this action.",
      httpStatus.BAD_REQUEST,
    ),
  );
};

const viewSheetPolicy = async (req, res, next) => {
  if (req.sheet.hasViewPermission(req.user)) {
    return next();
  }

  next(
    new ErrorResponse(
      "You are not authorized to access this sheet.",
      httpStatus.BAD_REQUEST,
    ),
  );
};

const editSheetPolicy = async (req, res, next) => {
  if (req.sheet.hasEditPermission(req.user)) {
    return next();
  }

  next(
    new ErrorResponse(
      "You are not authorized to edit this sheet.",
      httpStatus.BAD_REQUEST,
    ),
  );
};

const adminSheetPolicy = async (req, res, next) => {
  if (req.sheet.hasAdminPermission(req.user)) {
    return next();
  }

  next(
    new ErrorResponse(
      "You are not authorized for this action.",
      httpStatus.BAD_REQUEST,
    ),
  );
};

export { sheetPolicy, adminSheetPolicy, editSheetPolicy, viewSheetPolicy };
