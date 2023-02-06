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
import Permission from "../../models/Permission";
import PermissionRouter from "./permission";
import protect from "../../middlewares/auth";

const router = express.Router({ mergeParams: true });

router.use(protect);
router.use("/:sheetId/expenses", ExpenseRouter);
router.use("/:sheetId/permissions", PermissionRouter);

router
  .route("/")
  .get(
    advancedResults(
      Permission,
      {
        path: "sheet",
        populate: {
          path: "owner",
          select: "firstName lastName imageUrl",
        },
      },
      { user: true },
      "sheet,-_id,type",
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

export default router;
