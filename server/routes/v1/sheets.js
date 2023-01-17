import express from "express";

import {
  addSheet,
  deleteSheet,
  getSheet,
  getSheets,
  updateSheet,
} from "../../controllers/sheets";
import {
  adminSheetPolicy,
  editSheetPolicy,
  viewSheetPolicy,
} from "../../middlewares/authorize/sheetPolicy";
import advancedResults from "../../middlewares/advancedResults";
import ExpenseRouter from "./expenses";
import { findPermissionForUser } from "../../middlewares/permission";
import findSheet from "../../middlewares/sheet";
import PermissionRouter from "./permission";
import protect from "../../middlewares/auth";
import Sheet from "../../models/Sheet";

const router = express.Router({ mergeParams: true });

router.use(protect);
router.use("/:sheetId/expenses", ExpenseRouter);
router.use("/:sheetId/permissions", PermissionRouter);

router
  .route("/")
  .get(
    advancedResults(
      Sheet,
      {
        path: "owner",
        select: "firstName lastName",
      },
      true,
    ),
    getSheets,
  )
  .post(addSheet);

router
  .route("/:id")
  .get([findSheet, findPermissionForUser, viewSheetPolicy], getSheet)
  .put([findSheet, findPermissionForUser, editSheetPolicy], updateSheet)
  .delete([findSheet, findPermissionForUser, adminSheetPolicy], deleteSheet);

export default router;
