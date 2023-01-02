const httpStatus = require("http-status");

const ErrorResponse = require("../../utils/errorResponse");
const Expense = require("../../models/Expense");

// eslint-disable-next-line consistent-return
exports.expensePolicy = async (req, res, next) => {
  const expense = await Expense.findOne({
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

  req.expense = expense;

  // Make sure expense belongs to user
  if (expense && expense.owner._id.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        "Not authorized to access the expense",
        httpStatus.UNAUTHORIZED,
      ),
    );
  }
  if (!req.expense) {
    return next(
      new ErrorResponse(
        `No expense found with the id of ${req.params.id}`,
        httpStatus.NOT_FOUND,
      ),
    );
  }
  next();
};

exports.getExpensePolicy = async (req, res, next) => {
  // Access rights logic will lay down here....
  next();
};

exports.updateExpensePolicy = async (req, res, next) => {
  // Access rights logic will lay down here....
  next();
};

exports.deleteExpensePolicy = async (req, res, next) => {
  // Access rights logic will lay down here....
  next();
};
