import express from "express";

import {
  addSheet,
  deleteSheet,
  getPendingAmount,
  getReceivedAmount,
  getSheet,
  getSheets,
  getSpentAmount,
  getTotalAmount,
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
  .all(findSheet, sheetPolicy)
  .get(viewSheetPolicy, getSheet)
  .put(editSheetPolicy, updateSheet)
  .delete(adminSheetPolicy, deleteSheet);
router
  .route("/:id/received-amount")
  .get([findSheet, sheetPolicy, viewSheetPolicy], getReceivedAmount);
router
  .route("/:id/pending-amount")
  .get([findSheet, sheetPolicy, viewSheetPolicy], getPendingAmount);
router
  .route("/:id/spent-amount")
  .get([findSheet, sheetPolicy, viewSheetPolicy], getSpentAmount);
router
  .route("/:id/total-amount")
  .get([findSheet, sheetPolicy, viewSheetPolicy], getTotalAmount);

export default router;
