import httpStatus from "http-status";

import ErrorResponse from "../utils/errorResponse";
import { isMongoId } from "../utils/helpers";
import Sheet from "../models/Sheet";

const findSheet = async (req, res, next) => {
  const id = req.params.sheetId || req.params.id;

  if (!isMongoId(id)) {
    return next(new ErrorResponse("Invalid sheet id.", httpStatus.BAD_REQUEST));
  }

  req.sheet = await Sheet.findById(id);

  if (req.sheet) {
    return next();
  }

  next(
    new ErrorResponse(
      `No sheet found with the id of ${id}.`,
      httpStatus.NOT_FOUND,
    ),
  );
};

export default findSheet;
