import express from "express";

import {
  addExpense,
  deleteExpense,
  getExpense,
  getExpenses,
  updateExpense,
} from "../../controllers/expenses";
import {
  editSheetPolicy,
  viewSheetPolicy,
} from "../../middlewares/authorize/sheetPolicy";
import advancedResults from "../../middlewares/advancedResults";
import Expense from "../../models/Expense";
import findExpenseForSheet from "../../middlewares/expense";
import { findPermissionForUser } from "../../middlewares/permission";
import findSheet from "../../middlewares/sheet";

const router = express.Router({ mergeParams: true });
router.use(findSheet, findPermissionForUser);

router
  .route("/")
  .get(
    advancedResults(Expense, {
      path: "sheet",
      select: "title owner",
    }),
    viewSheetPolicy,
    getExpenses,
  )
  .post(editSheetPolicy, addExpense);

router
  .route("/:id")
  .get([viewSheetPolicy, findExpenseForSheet], getExpense)
  .put([editSheetPolicy, findExpenseForSheet], updateExpense)
  .delete([editSheetPolicy, findExpenseForSheet], deleteExpense);

export default router;
