import httpStatus from "http-status";

import ErrorResponse from "../../utils/errorResponse";
import Permission from "../../models/Permission";

const permissionPolicy = async (req, res, next) => {
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

const adminPolicy = async (req, res, next) => {
  if (
    !(
      req.user.id === req.sheet.owner._id.toString() ||
      req.permission?.type === "admin"
    )
  ) {
    return next(
      new ErrorResponse(
        "You are not authorized for this action.",
        httpStatus.UNAUTHORIZED,
      ),
    );
  }

  next();
};

export { permissionPolicy, adminPolicy };
