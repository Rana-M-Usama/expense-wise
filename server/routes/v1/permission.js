import express from "express";

import {
  adminPolicy,
  sheetPolicy,
} from "../../middlewares/authorize/sheetPolicy";
import {
  deletePermission,
  getPermission,
  getPermissions,
  grantPermission,
} from "../../controllers/permissions";
import {
  getPermissionPolicy,
  permissionPolicy,
} from "../../middlewares/authorize/permissionPolicy";

const router = express.Router({ mergeParams: true });
router.use(sheetPolicy, permissionPolicy, adminPolicy);

router.route("/").get(getPermissions).post(grantPermission);

router
  .route("/:id")
  .get(getPermissionPolicy, getPermission)
  .delete(getPermissionPolicy, deletePermission);

export default router;
