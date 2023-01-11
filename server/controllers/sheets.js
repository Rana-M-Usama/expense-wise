import httpStatus from "http-status";

import asyncHandler from "../middlewares/async";
import Sheet from "../models/Sheet";

// @desc      Get sheets
// @route     GET /api/v1/sheets
// @route     GET /api/v1/bootcamps/:bootcampId/sheets
// @access    Private
const getSheets = asyncHandler(async (req, res) =>
  res.status(httpStatus.OK).json(res.advancedResults));

// @desc      Get single sheet
// @route     GET /api/v1/sheets/:id
// @access    Private
const getSheet = asyncHandler(async (req, res) =>
  res.status(httpStatus.OK).json({
    success: true,
    data: req.sheet,
  }));

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
