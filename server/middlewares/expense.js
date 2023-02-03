import httpStatus from "http-status";

import ErrorResponse from "../utils/errorResponse";
import Expense from "../models/Expense";
import { isMongoId } from "../utils/helpers";

const findExpense = async (req, res, next) => {
  const { id } = req.params;

  if (!isMongoId(id)) {
    return next(
      new ErrorResponse("Invalid expense id.", httpStatus.BAD_REQUEST),
    );
  }

  req.expense = await Expense.findOne({ _id: id, sheet: req.sheet })
    .populate("owner", ["firstName", "lastName"])
    .populate("sheet", ["title", "owner"])
    .populate({
      path: "sheet",
      select: "title",
      populate: {
        path: "owner",
        select: "firstName lastName",
      },
    });

  if (req.expense) {
    return next();
  }

  next(
    new ErrorResponse(
      `No expense found with the id of ${id}.`,
      httpStatus.NOT_FOUND,
    ),
  );
};

export default findExpense;
