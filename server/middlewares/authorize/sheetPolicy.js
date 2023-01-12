import httpStatus from "http-status";

import ErrorResponse from "../../utils/errorResponse";
import Permission from "../../models/Permission";
import Sheet from "../../models/Sheet";

const sheetPolicy = async (req, res, next) => {
  const id = req.params.sheetId || req.params.id;
  req.sheet = await Sheet.findById(id);
  req.permission = await Permission.findOne({
    sheet: req.sheet,
    user: req.user.id,
  });

  if (!req.sheet) {
    return next(
      new ErrorResponse(
        `No sheet found with the id of ${id}.`,
        httpStatus.NOT_FOUND,
      ),
    );
  }

  next();
};

const getSheetPolicy = async (req, res, next) => {
  if (
    !(
      req.user.id === req.sheet.owner._id.toString() ||
      ["admin", "view", "edit"].includes(req.permission?.type)
    )
  ) {
    return next(
      new ErrorResponse(
        "You are not authorized to access this sheet.",
        httpStatus.UNAUTHORIZED,
      ),
    );
  }

  next();
};

const updateSheetPolicy = async (req, res, next) => {
  if (
    !(
      req.user.id === req.sheet.owner._id.toString() ||
      ["admin", "edit"].includes(req.permission?.type)
    )
  ) {
    return next(
      new ErrorResponse(
        "You are not authorized to edit this sheet.",
        httpStatus.UNAUTHORIZED,
      ),
    );
  }

  next();
};

const deleteSheetPolicy = async (req, res, next) => {
  if (
    !(
      req.user.id === req.sheet.owner._id.toString() ||
      req.permission?.type === "admin"
    )
  ) {
    return next(
      new ErrorResponse(
        "You are not authorized to delete this sheet.",
        httpStatus.UNAUTHORIZED,
      ),
    );
  }

  next();
};

export { sheetPolicy, getSheetPolicy, updateSheetPolicy, deleteSheetPolicy };
