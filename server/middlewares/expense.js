import httpStatus from "http-status";

import ErrorResponse from "../utils/errorResponse";
import Expense from "../models/Expense";

const findExpenseForSheet = async (req, res, next) => {
  req.expense = await Expense.findOne({
    _id: req.params.id,
    sheet: req.params.sheetId,
  })
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

  if (!req.expense) {
    return next(
      new ErrorResponse(
        `No expense found with the id of ${req.params.id}.`,
        httpStatus.NOT_FOUND,
      ),
    );
  }
  next();
};

export default findExpenseForSheet;
