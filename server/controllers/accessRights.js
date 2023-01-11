import httpStatus from "http-status";

import AccessRight from "../models/AccessRight";
import asyncHandler from "../middlewares/async";

// @desc      get accessRights
// @route     GET /api/v1/sheets/:sheetId/access-rights
// @access    Private
const getAccessRights = asyncHandler(async (req, res) => {
  const accessRights = await AccessRight.find({ sheetId: req.sheet._id });
  return res.status(httpStatus.OK).json({ succes: true, accessRights });
});

// @desc      Add accessRight
// @route     POST /api/v1/sheets/:sheetId/access-rights
// @access    Private
const grantAccess = asyncHandler(async (req, res) => {
  req.body.sheet = req.sheet._id;

  let accessRight = await AccessRight.findOne({
    user: req.body.user,
    sheet: req.body.sheet,
  });

  if (accessRight) {
    accessRight = await AccessRight.findOneAndUpdate(
      { user: req.body.user, sheet: req.body.sheet },
      req.body,
    );
  } else {
    accessRight = await AccessRight.create(req.body);
  }

  return res.status(httpStatus.OK).json({
    success: true,
    data: accessRight,
  });
});

// @desc      Get a single access right
// @route     GET /api/v1/access-rights/:id
// @access    Private
const getAccessRight = asyncHandler(async (req, res) =>
  res.status(httpStatus.OK).json({
    success: true,
    data: req.accessRight,
  }));

// @desc      Delete access right
// @route     DELETE /api/v1/access-rights/:id
// @access    Private
const deleteAccessRight = asyncHandler(async (req, res) => {
  await req.accessRight.remove();

  res.status(httpStatus.OK).json({
    success: true,
    data: {},
  });
});

export { getAccessRights, getAccessRight, grantAccess, deleteAccessRight };
