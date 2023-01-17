import httpStatus from "http-status";

import asyncHandler from "../middlewares/async";
import Permission from "../models/Permission";

// @desc      get permissions
// @route     GET /api/v1/sheets/:sheetId/permissions
// @access    Private
const getPermissions = asyncHandler(async (req, res) => {
  const permissions = await Permission.find({ sheetId: req.sheet._id });
  return res.status(httpStatus.OK).json({ succes: true, permissions });
});

// @desc      Add permissions
// @route     POST /api/v1/sheets/:sheetId/permissions
// @access    Private
const grantPermission = asyncHandler(async (req, res) => {
  req.body.sheet = req.sheet._id;

  let permission = await Permission.findOne({
    user: req.body.user,
    sheet: req.body.sheet,
  });

  if (permission) {
    permission = await Permission.findOneAndUpdate(
      { user: req.body.user, sheet: req.body.sheet },
      req.body,
      {
        runValidators: true,
      },
    );
  } else {
    permission = await Permission.create(req.body);
  }

  return res.status(httpStatus.OK).json({
    success: true,
    data: permission,
  });
});

// @desc      Get a single permission
// @route     GET /api/v1/sheets/:sheetId/permissions/:id
// @access    Private
const getPermission = asyncHandler(async (req, res) =>
  res.status(httpStatus.OK).json({
    success: true,
    data: req.permission,
  }),
);

// @desc      Delete permission
// @route     DELETE /api/v1/sheets/:sheetId/permissions/:id
// @access    Private
const deletePermission = asyncHandler(async (req, res) => {
  await req.permission.remove();

  res.status(httpStatus.OK).json({
    success: true,
    data: {},
  });
});

export { getPermissions, getPermission, grantPermission, deletePermission };
