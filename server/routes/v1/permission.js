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
import { sheetPolicy } from "../../middlewares/authorize/sheetPolicy";

const router = express.Router({ mergeParams: true });
router.use(sheetPolicy);

router
  .route("/")
  .get(adminPolicy, getPermissions)
  .post(adminPolicy, grantPermission);

router
  .route("/:id")
  .get([permissionPolicy, adminPolicy], getPermission)
  .delete([permissionPolicy, adminPolicy], deletePermission);

export default router;
