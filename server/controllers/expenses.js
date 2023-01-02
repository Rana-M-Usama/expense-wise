/* eslint-disable arrow-body-style */
/* eslint-disable consistent-return */
const httpStatus = require("http-status");
const asyncHandler = require("../middlewares/async");
const Expense = require("../models/Expense");

// @desc      Get expenses
// @route     GET /api/v1/expenses
// @route     GET /api/v1/sheets/:sheetId/expenses
// @access    Public
exports.getExpenses = asyncHandler(async (req, res) => {
  return res.status(httpStatus.OK).json(res.advancedResults);
});

// @desc      Get single expense
// @route     GET /api/v1/expenses/:id
// @access    Public
exports.getExpense = asyncHandler(async (req, res) => {
  return res.status(httpStatus.OK).json({
    success: true,
    data: req.expense,
  });
});

// @desc      Add expense
// @route     POST /api/v1/sheets/:sheetId/expenses
// @access    Private
exports.addExpense = asyncHandler(async (req, res) => {
  req.body.sheet = req.params.sheetId;
  req.body.owner = req.user.id;

  const expense = await Expense.create(req.body);

  return res.status(httpStatus.OK).json({
    success: true,
    data: expense,
  });
});

// @desc      Update expense
// @route     PUT /api/v1/expenses/:id
// @access    Private
exports.updateExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(httpStatus.OK).json({
    success: true,
    data: expense,
  });
});

// @desc      Delete expense
// @route     DELETE /api/v1/expenses/:id
// @access    Private
exports.deleteExpense = asyncHandler(async (req, res) => {
  await req.expense.remove();

  res.status(httpStatus.OK).json({
    success: true,
    data: {},
  });
});
