/* eslint-disable arrow-body-style */
/* eslint-disable consistent-return */
const httpStatus = require("http-status");
const asyncHandler = require("../middlewares/async");
const Sheet = require("../models/Sheet");

// @desc      Get sheets
// @route     GET /api/v1/sheets
// @route     GET /api/v1/bootcamps/:bootcampId/sheets
// @access    Public
exports.getSheets = asyncHandler(async (req, res) => {
  return res.status(httpStatus.OK).json(res.advancedResults);
});

// @desc      Get single sheet
// @route     GET /api/v1/sheets/:id
// @access    Public
exports.getSheet = asyncHandler(async (req, res) => {
  return res.status(httpStatus.OK).json({
    success: true,
    data: req.sheet,
  });
});

// @desc      Add sheet
// @route     POST /api/v1/bootcamps/:bootcampId/sheets
// @access    Private
exports.addSheet = asyncHandler(async (req, res) => {
  req.body.user = req.user.id;

  const sheet = await Sheet.create(req.body);

  res.status(httpStatus.ACCEPTED).json({
    success: true,
    data: sheet,
  });
});

// @desc      Update sheet
// @route     PUT /api/v1/sheets/:id
// @access    Private
exports.updateSheet = asyncHandler(async (req, res) => {
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
exports.deleteSheet = asyncHandler(async (req, res) => {
  await req.sheet.remove();

  res.status(httpStatus.OK).json({
    success: true,
    data: {},
  });
});
