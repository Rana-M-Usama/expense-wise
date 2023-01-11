import express from "express";

import protect from "../../middlewares/auth";

import {
  deleteAccessRight,
  getAccessRight,
  getAccessRights,
  grantAccess,
} from "../../controllers/accessRights";

import { sheetPolicy } from "../../middlewares/authorize/sheetPolicy";

import {
  accessRightPolicy,
  ownerAccessRightPolicy,
} from "../../middlewares/authorize/accessRightPolicy";

const router = express.Router({ mergeParams: true });
router.use([protect, sheetPolicy]);

router
  .route("/")
  .get(ownerAccessRightPolicy, getAccessRights)
  .post([ownerAccessRightPolicy], grantAccess);

router
  .route("/:id")
  .get([accessRightPolicy, ownerAccessRightPolicy], getAccessRight)
  .delete([accessRightPolicy, ownerAccessRightPolicy], deleteAccessRight);

export default router;
