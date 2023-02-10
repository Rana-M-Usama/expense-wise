import httpStatus from "http-status";

import { EDIT, VIEW } from "../constants/permission";
import asyncHandler from "../middlewares/async";
import ErrorResponse from "../utils/errorResponse";
import Permission from "../models/Permission";

// @desc      get permissions
// @route     GET /api/v1/sheets/:sheetId/permissions
// @access    Private
const getPermissions = asyncHandler(async (req, res) => {
  const permissions = await Permission.find({ sheet: req.sheet })
    .populate("user", ["email"])
    .populate("sheet", ["title"]);

  return res.status(httpStatus.OK).json({ success: true, permissions });
});

// @desc      Add permissions
// @route     POST /api/v1/sheets/:sheetId/permissions
// @access    Private
const grantPermission = asyncHandler(async (req, res, next) => {
  req.body.sheet = req.sheet._id;
  const { _id, email } = req.body.user;

  let permission = await Permission.findOne({
    user: req.body.user,
    sheet: req.body.sheet,
  });
  const assigneePermission = await Permission.findOne({
    user: req.user,
    sheet: req.body.sheet,
  });

  if (permission) {
    if (
      (assigneePermission.type === VIEW && permission.type !== VIEW) ||
      (assigneePermission.type === EDIT && permission.type !== EDIT) ||
      (assigneePermission.type === EDIT &&
        permission.type === EDIT &&
        req.body.type === VIEW)
    ) {
      return next(
        new ErrorResponse(
          "You do not have rights to assign this permission.",
          httpStatus.BAD_REQUEST,
        ),
      );
    }

    permission = await Permission.findOneAndUpdate(
      { user: req.body.user, sheet: req.body.sheet },
      req.body,
      {
        runValidators: true,
        new: true,
      },
    );
  } else {
    permission = await Permission.create(req.body);
  }

  return res.status(httpStatus.OK).json({
    success: true,
    data: { ...permission._doc, user: { _id, email } },
  });
});

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

export { getPermissions, grantPermission, deletePermission };
