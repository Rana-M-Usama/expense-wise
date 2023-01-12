import express from "express";

import {
  adminPolicy,
  permissionPolicy,
} from "../../middlewares/authorize/permissionPolicy";
import {
  deletePermission,
  getPermission,
  getPermissions,
  grantPermission,
} from "../../controllers/permissions";
import protect from "../../middlewares/auth";
import { sheetPolicy } from "../../middlewares/authorize/sheetPolicy";

const router = express.Router({ mergeParams: true });
router.use([protect, sheetPolicy]);

router
  .route("/")
  .get(adminPolicy, getPermissions)
  .post([adminPolicy], grantPermission);

router
  .route("/:id")
  .get([permissionPolicy, adminPolicy], getPermission)
  .delete([permissionPolicy, adminPolicy], deletePermission);

export default router;
