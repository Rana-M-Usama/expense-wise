import express from "express";

import Expense from "../../models/Expense";
import advancedResults from "../../middlewares/advancedResults";
import protect from "../../middlewares/auth";
import { sheetPolicy } from "../../middlewares/authorize/sheetPolicy";
import {
  getExpenses,
  getExpense,
  addExpense,
  updateExpense,
  deleteExpense,
} from "../../controllers/expenses";
import {
  expensePolicy,
  getExpensePolicy,
  updateExpensePolicy,
  deleteExpensePolicy,
} from "../../middlewares/authorize/expensePolicy";

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
