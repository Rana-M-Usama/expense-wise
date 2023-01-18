import httpStatus from "http-status";

import ErrorResponse from "../utils/errorResponse";
import Expense from "../models/Expense";

const findExpense = async (req, res, next) => {
  req.expense = await Expense.findById(req.params.id)
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
      `No expense found with the id of ${req.params.id}.`,
      httpStatus.NOT_FOUND,
    ),
  );
};

export default findExpense;
