import httpStatus from "http-status";

import ErrorResponse from "../../utils/errorResponse";
import Sheet from "../../models/Sheet";

const sheetPolicy = async (req, res, next) => {
  const id = req.params.sheetId || req.params.id;
  req.sheet = await Sheet.findById(id);

  if (!req.sheet) {
    return next(
      new ErrorResponse(
        `No sheet found with the id of ${id}.`,
        httpStatus.NOT_FOUND,
      ),
    );
  }

  if (req.sheet.owner.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        "Your are not authorized to access this sheet.",
        httpStatus.UNAUTHORIZED,
      ),
    );
  }

  next();
};

const getSheetPolicy = async (req, res, next) => {
  // Access rights logic will lay down here....
  next();
};

const updateSheetPolicy = async (req, res, next) => {
  // Access rights logic will lay down here....
  next();
};

const deleteSheetPolicy = async (req, res, next) => {
  // Access rights logic will lay down here....
  next();
};

export { sheetPolicy, getSheetPolicy, updateSheetPolicy, deleteSheetPolicy };
