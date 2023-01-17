import express from "express";

import {
  deletePermission,
  getPermission,
  getPermissions,
  grantPermission,
} from "../../controllers/permissions";
import {
  findPermission,
  findPermissionForUser,
} from "../../middlewares/permission";
import { adminSheetPolicy } from "../../middlewares/authorize/sheetPolicy";
import findSheet from "../../middlewares/sheet";
import grantPermissionPolicy
  from "../../middlewares/authorize/permissionPolicy";

const router = express.Router({ mergeParams: true });
router.use(findSheet, findPermissionForUser);

router
  .route("/")
  .get(getPermissions)
  .post(grantPermissionPolicy, grantPermission);

router
  .route("/:id")
  .get(adminSheetPolicy, findPermission, getPermission)
  .delete(adminSheetPolicy, findPermission, deletePermission);

export default router;
