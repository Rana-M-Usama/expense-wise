import httpStatus from "http-status";

import ErrorResponse from "../utils/errorResponse";
import Permission from "../models/Permission";

const VIEW_PERMISSIONS = ["view", "edit", "admin"];
const ADMIN_PERMISSIONS = ["admin"];
const EDIT_PERMISSIONS = ["edit", "admin"];
const VIEW = "view";
const EDIT = "edit";
const ADMIN = "admin";

const permission = async (req, res, next) => {
  req.user.permission = await Permission.findOne({
    sheet: req.sheet,
    user: req.user.id,
  });

  if (!req.user.permission) {
    return next(
      new ErrorResponse(
        "You are not authorized for this action.",
        httpStatus.NOT_FOUND,
      ),
    );
  }

  next();
};

const getPermissionById = async (req, res, next) => {
  req.permission = await Permission.findOne({
    _id: req.params.id,
    sheet: req.params.sheetId,
  });

  if (!req.permission) {
    return next(
      new ErrorResponse(
        `No permission found with the id of ${req.params.id}.`,
        httpStatus.NOT_FOUND,
      ),
    );
  }

  next();
};

export {
  permission,
  getPermissionById,
  ADMIN_PERMISSIONS,
  EDIT_PERMISSIONS,
  VIEW_PERMISSIONS,
  VIEW,
  ADMIN,
  EDIT,
};
