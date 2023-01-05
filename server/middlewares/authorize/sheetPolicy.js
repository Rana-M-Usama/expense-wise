const httpStatus = require("http-status");

const ErrorResponse = require("../../utils/errorResponse");
const Sheet = require("../../models/Sheet");

exports.sheetPolicy = async (req, res, next) => {
  const id = req.params.sheetId || req.params.id;
  const sheet = await Sheet.findById(id);
  req.sheet = sheet;

  if (sheet && sheet.owner.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        "Not authorized to access the sheet",
        httpStatus.UNAUTHORIZED,
      ),
    );
  }
  if (!req.sheet) {
    return next(
      new ErrorResponse(
        `No sheet found with the id of ${req.params.id || req.params.sheetId}`,
        httpStatus.NOT_FOUND,
      ),
    );
  }
  next();
};

exports.getSheetPolicy = async (req, res, next) => {
  // Access rights logic will lay down here....
  next();
};

exports.updateSheetPolicy = async (req, res, next) => {
  // Access rights logic will lay down here....
  next();
};

exports.deleteSheetPolicy = async (req, res, next) => {
  // Access rights logic will lay down here....
  next();
};
