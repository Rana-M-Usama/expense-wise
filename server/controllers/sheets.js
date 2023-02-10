import httpStatus from "http-status";

import asyncHandler from "../middlewares/async";
import { getAmountStats } from "../utils/helpers";
import Permission from "../models/Permission";
import Sheet from "../models/Sheet";

// @desc      Get sheets
// @route     GET /api/v1/sheets
// @access    Private
const getSheets = asyncHandler(async (req, res) => {
  const sheets = res.advancedResults.data.map((result) => ({
    ...result.sheet._doc,
    permissionType: result.type,
  }));

  res.status(httpStatus.OK).json({ ...res.advancedResults, data: sheets });
});

// @desc      Get single sheet
// @route     GET /api/v1/sheets/:id
// @access    Private
const getSheet = asyncHandler(async (req, res) => {
  const amounts = await getAmountStats(req.sheet);
  const permission = await Permission.findOne({
    sheet: req.sheet,
    user: req.user,
  });

  return res.status(httpStatus.OK).json({
    success: true,
    data: { ...req.sheet._doc, amounts, permissionType: permission.type },
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
