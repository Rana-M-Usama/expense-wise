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
  sheetPolicy,
  viewSheetPolicy,
} from "../../middlewares/authorize/sheetPolicy";
import advancedResults from "../../middlewares/advancedResults";
import Expense from "../../models/Expense";
import expensePolicy from "../../middlewares/authorize/expensePolicy";
import findExpense from "../../middlewares/expense";
import findSheet from "../../middlewares/sheet";

const router = express.Router({ mergeParams: true });
router.use(findSheet, sheetPolicy);

router
  .route("/")
  .get(
    advancedResults(
      Expense,
      {
        path: "sheet",
        select: "title owner",
      },
      { sheet: true },
    ),
    viewSheetPolicy,
    getExpenses,
  )
  .post(editSheetPolicy, addExpense);

router
  .route("/:id")
  .all(findExpense, expensePolicy)
  .get(viewSheetPolicy, getExpense)
  .put(editSheetPolicy, updateExpense)
  .delete(editSheetPolicy, deleteExpense);

export default router;
