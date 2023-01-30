import httpStatus from "http-status";

import {
  pendingAmount,
  receivedAmount,
  spentAmount,
  totalAmount,
} from "../utils/helpers";
import asyncHandler from "../middlewares/async";
import Sheet from "../models/Sheet";

// @desc      Get sheets
// @route     GET /api/v1/sheets
// @access    Private
const getSheets = asyncHandler(async (req, res) =>
  res.status(httpStatus.OK).json(res.advancedResults),
);

// @desc      Get single sheet
// @route     GET /api/v1/sheets/:id
// @access    Private
const getSheet = asyncHandler(async (req, res) =>
  res.status(httpStatus.OK).json({
    success: true,
    data: req.sheet,
  }),
);

// @desc      Add sheet
// @route     POST /api/v1/sheets/
// @access    Private
const addSheet = asyncHandler(async (req, res) => {
  req.body.owner = req.user.id;
  const sheet = await Sheet.create(req.body);

  res.status(httpStatus.ACCEPTED).json({
    success: true,
    data: sheet,
  });
});

// @desc      Update sheet
// @route     PUT /api/v1/sheets/:id
// @access    Private
const updateSheet = asyncHandler(async (req, res) => {
  const sheet = await Sheet.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(httpStatus.OK).json({
    success: true,
    data: sheet,
  });
});

// @desc      Delete sheet
// @route     DELETE /api/v1/sheets/:id
// @access    Private
const deleteSheet = asyncHandler(async (req, res) => {
  await req.sheet.remove();

  res.status(httpStatus.OK).json({
    success: true,
    data: {},
  });
});

// @desc      Received Amount
// @route     GET /api/v1/sheets/:id/received-amount
// @access    Private
const getReceivedAmount = asyncHandler(async (req, res) => {
  const amount = await receivedAmount(req.sheet);

  res.status(httpStatus.OK).json({
    success: true,
    data: { receivedAmount: amount },
  });
});

// @desc      Pending Amount
// @route     GET /api/v1/sheets/:id/pending-amount
// @access    Private
const getPendingAmount = asyncHandler(async (req, res) => {
  const amount = await pendingAmount(req.sheet);

  res.status(httpStatus.OK).json({
    success: true,
    data: { pendingAmount: amount },
  });
});

// @desc      Spent Amount
// @route     GET /api/v1/sheets/:id/spent-amount
// @access    Private
const getSpentAmount = asyncHandler(async (req, res) => {
  const amount = await spentAmount(req.sheet);

  res.status(httpStatus.OK).json({
    success: true,
    data: { spentAmount: amount },
  });
});

// @desc      Total Amount
// @route     GET /api/v1/sheets/:id/total-amount
// @access    Private
const getTotalAmount = asyncHandler(async (req, res) => {
  const amount = await totalAmount(req.sheet);

  res.status(httpStatus.OK).json({
    success: true,
    data: { totalAmount: amount },
  });
});

export {
  getSheets,
  getSheet,
  addSheet,
  updateSheet,
  deleteSheet,
  getReceivedAmount,
  getPendingAmount,
  getSpentAmount,
  getTotalAmount,
};
