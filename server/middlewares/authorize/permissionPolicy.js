import httpStatus from "http-status";

import ErrorResponse from "../../utils/errorResponse";
import Permission from "../../models/Permission";

const permissionPolicy = async (req, res, next) => {
  req.permission = await Permission.findOne({
    sheet: req.sheet,
    user: req.user.id,
  });

  next();
};

const getPermissionPolicy = async (req, res, next) => {
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

export { getPermissionPolicy, permissionPolicy };
