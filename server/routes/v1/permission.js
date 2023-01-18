import express from "express";

import {
  adminSheetPolicy,
  sheetPolicy,
} from "../../middlewares/authorize/sheetPolicy";
import {
  deletePermission,
  getPermissions,
  grantPermission,
} from "../../controllers/permissions";
import {
  grantPermissionPolicy,
  permissionPolicy,
} from "../../middlewares/authorize/permissionPolicy";
import findPermission from "../../middlewares/permission";
import findSheet from "../../middlewares/sheet";

const router = express.Router({ mergeParams: true });
router.use(findSheet, sheetPolicy);

router
  .route("/")
  .get(getPermissions)
  .post(grantPermissionPolicy, grantPermission);

router
  .route("/:id")
  .delete(
    [findPermission, permissionPolicy, adminSheetPolicy],
    deletePermission,
  );

export default router;
