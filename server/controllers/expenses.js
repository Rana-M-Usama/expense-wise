import httpStatus from "http-status";

import asyncHandler from "../middlewares/async";
import Expense from "../models/Expense";

// @desc      Get expenses
// @route     GET /api/v1/sheets/:sheetId/expenses
// @access    Private
const getExpenses = asyncHandler(async (req, res) =>
  res.status(httpStatus.OK).json(res.advancedResults),
);

// @desc      Get a single expense
// @route     GET /api/v1/sheets/:sheetId/expenses/:id
// @access    Private
const getExpense = asyncHandler(async (req, res) =>
  res.status(httpStatus.OK).json({
    success: true,
    data: req.expense,
  }),
);

// @desc      Add expense
// @route     POST /api/v1/sheets/:sheetId/expenses
// @access    Private
const addExpense = asyncHandler(async (req, res) => {
  req.body.sheet = req.params.sheetId;
  req.body.owner = req.user.id;

  const expense = await Expense.create(req.body);

  return res.status(httpStatus.OK).json({
    success: true,
    data: expense,
  });
});

// @desc      Update expense
// @route     PUT /api/v1/sheets/:sheetId/expenses/:id
// @access    Private
const updateExpense = asyncHandler(async (req, res) => {
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
// @route     DELETE /api/v1/sheets/:sheetId/expenses/:id
// @access    Private
const deleteExpense = asyncHandler(async (req, res) => {
  await req.expense.remove();

  res.status(httpStatus.OK).json({
    success: true,
    data: {},
  });
});

export { getExpenses, getExpense, addExpense, deleteExpense, updateExpense };
