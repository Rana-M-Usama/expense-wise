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
  sheetPolicy,
  viewSheetPolicy,
} from "../../middlewares/authorize/sheetPolicy";
import advancedResults from "../../middlewares/advancedResults";
import ExpenseRouter from "./expenses";
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
  .get([findSheet, sheetPolicy, viewSheetPolicy], getSheet)
  .put([findSheet, sheetPolicy, editSheetPolicy], updateSheet)
  .delete([findSheet, sheetPolicy, adminSheetPolicy], deleteSheet);

export default router;
