import express from "express";

import {
  addSheet,
  deleteSheet,
  getSheet,
  getSheets,
  updateSheet,
} from "../../controllers/sheets";
import {
  deleteSheetPolicy,
  getSheetPolicy,
  sheetPolicy,
  updateSheetPolicy,
} from "../../middlewares/authorize/sheetPolicy";
import AccessRightRouter from "./accessRights";
import advancedResults from "../../middlewares/advancedResults";
import ExpenseRouter from "./expenses";
import protect from "../../middlewares/auth";
import Sheet from "../../models/Sheet";

const router = express.Router({ mergeParams: true });

router.use("/:sheetId/expenses", ExpenseRouter);
router.use("/:sheetId/access-rights", AccessRightRouter);

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
