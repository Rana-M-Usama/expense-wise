import httpStatus from "http-status";
import ErrorResponse from "../../utils/errorResponse";
import Expense from "../../models/Expense";

const expensePolicy = async (req, res, next) => {
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

  if (req.expense.owner._id.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        "Your are not authorized to access the expense.",
        httpStatus.UNAUTHORIZED,
      ),
    );
  }

  next();
};

const getExpensePolicy = async (req, res, next) => {
  // Access rights logic will lay down here....
  next();
};

const updateExpensePolicy = async (req, res, next) => {
  // Access rights logic will lay down here....
  next();
};

const deleteExpensePolicy = async (req, res, next) => {
  // Access rights logic will lay down here....
  next();
};

export {
  expensePolicy,
  getExpensePolicy,
  updateExpensePolicy,
  deleteExpensePolicy,
};
