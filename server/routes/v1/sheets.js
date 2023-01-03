import express from "express";

import Sheet from "../../models/Sheet";
import ExpenseRouter from "./expenses";
import advancedResults from "../../middlewares/advancedResults";
import protect from "../../middlewares/auth";
import {
  getSheets,
  getSheet,
  addSheet,
  updateSheet,
  deleteSheet,
} from "../../controllers/sheets";
import {
  sheetPolicy,
  getSheetPolicy,
  updateSheetPolicy,
  deleteSheetPolicy,
} from "../../middlewares/authorize/sheetPolicy";

const router = express.Router({ mergeParams: true });

router.use("/:sheetId/expenses", ExpenseRouter);
router.use(protect);

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
  .get([sheetPolicy, getSheetPolicy], getSheet)
  .put([sheetPolicy, updateSheetPolicy], updateSheet)
  .delete([sheetPolicy, deleteSheetPolicy], deleteSheet);

export default router;
