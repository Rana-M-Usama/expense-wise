import httpStatus from "http-status";

import AccessRight from "../../models/AccessRight";
import ErrorResponse from "../../utils/errorResponse";

const accessRightPolicy = async (req, res, next) => {
  req.accessRight = await AccessRight.findOne({
    _id: req.params.id,
    sheet: req.params.sheetId,
  });

  if (!req.accessRight) {
    return next(
      new ErrorResponse(
        `No Access Right found with the id of ${req.params.id}.`,
        httpStatus.NOT_FOUND,
      ),
    );
  }

  next();
};

const ownerAccessRightPolicy = async (req, res, next) => {
  if (req.sheet.owner._id.toString() !== req?.user?.id) {
    return next(
      new ErrorResponse(
        "You are not authorized for this action.",
        httpStatus.UNAUTHORIZED,
      ),
    );
  }

  next();
};

export { accessRightPolicy, ownerAccessRightPolicy };
