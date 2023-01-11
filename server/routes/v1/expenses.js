import express from "express";

import {
  addExpense,
  deleteExpense,
  getExpense,
  getExpenses,
  updateExpense,
} from "../../controllers/expenses";
import {
  addExpensePolicy,
  deleteExpensePolicy,
  expensePolicy,
  getExpensePolicy,
  updateExpensePolicy,
} from "../../middlewares/authorize/expensePolicy";
import {
  getSheetPolicy,
  sheetPolicy,
} from "../../middlewares/authorize/sheetPolicy";
import advancedResults from "../../middlewares/advancedResults";
import Expense from "../../models/Expense";
import protect from "../../middlewares/auth";

const router = express.Router({ mergeParams: true });
router.use([protect, sheetPolicy]);

router
  .route("/")
  .get(
    advancedResults(Expense, {
      path: "sheet",
      select: "title owner",
    }),
    getSheetPolicy,
    getExpenses,
  )
  .post(addExpensePolicy, addExpense);

router
  .route("/:id")
  .get([getExpensePolicy, expensePolicy], getExpense)
  .put([updateExpensePolicy, expensePolicy], updateExpense)
  .delete([deleteExpensePolicy, expensePolicy], deleteExpense);

export default router;
