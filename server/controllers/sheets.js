import httpStatus from "http-status";

import {
  calculatePendingAmount,
  calculateReceivedAmount,
  calculateSpentAmount,
  calculateTotalAmount,
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
const getSheet = asyncHandler(async (req, res) => {
  const receivedAmount = await calculateReceivedAmount(req.sheet);
  const pendingAmount = await calculatePendingAmount(req.sheet);
  const spentAmount = await calculateSpentAmount(req.sheet);
  const totalAmount = await calculateTotalAmount(req.sheet);

  return res.status(httpStatus.OK).json({
    success: true,
    data: req.sheet,
    amounts: { receivedAmount, pendingAmount, spentAmount, totalAmount },
  });
});

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

export { getSheets, getSheet, addSheet, updateSheet, deleteSheet };
