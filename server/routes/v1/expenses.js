import express from "express";

import {
  addExpense,
  deleteExpense,
  getExpense,
  getExpenses,
  updateExpense,
} from "../../controllers/expenses";
import {
  deleteExpensePolicy,
  expensePolicy,
  getExpensePolicy,
  updateExpensePolicy,
} from "../../middlewares/authorize/expensePolicy";
import advancedResults from "../../middlewares/advancedResults";
import Expense from "../../models/Expense";
import protect from "../../middlewares/auth";
import { sheetPolicy } from "../../middlewares/authorize/sheetPolicy";

const router = express.Router({ mergeParams: true });
router.use([protect, sheetPolicy]);

router
  .route("/")
  .get(
    advancedResults(Expense, {
      path: "sheet",
      select: "title owner",
    }),
    getExpenses,
  )
  .post(addExpense);

router
  .route("/:id")
  .get([expensePolicy, getExpensePolicy], getExpense)
  .put([expensePolicy, updateExpensePolicy], updateExpense)
  .delete([expensePolicy, deleteExpensePolicy], deleteExpense);

export default router;
