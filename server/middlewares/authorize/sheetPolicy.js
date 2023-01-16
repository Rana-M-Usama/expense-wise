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

  next();
};

const viewPolicy = async (req, res, next) => {
  if (!["admin", "view", "edit"].includes(req.permission?.type)) {
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
  if (!["admin", "edit"].includes(req.permission?.type)) {
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
  if (!(req.permission?.type === "admin")) {
    return next(
      new ErrorResponse(
        "You are not authorized for this action.",
        httpStatus.UNAUTHORIZED,
      ),
    );
  }

  next();
};

export { sheetPolicy, adminPolicy, editPolicy, viewPolicy };
