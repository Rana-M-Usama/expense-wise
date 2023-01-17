import express from "express";

import {
  deletePermission,
  getPermission,
  getPermissions,
  grantPermission,
} from "../../controllers/permissions";
import { getPermissionById, permission } from "../../middlewares/permission";
import { adminPolicy } from "../../middlewares/authorize/sheetPolicy";
import grantPermissionPolicy from "../../middlewares/authorize/permissionPolicy";
import sheet from "../../middlewares/sheet";

const router = express.Router({ mergeParams: true });
router.use(sheet, permission);

router
  .route("/")
  .get(getPermissions)
  .post(grantPermissionPolicy, grantPermission);

router
  .route("/:id")
  .get(adminPolicy, getPermissionById, getPermission)
  .delete(adminPolicy, getPermissionById, deletePermission);

export default router;
