import express from "express";

import {
  addExpense,
  deleteExpense,
  getExpense,
  getExpenses,
  updateExpense,
} from "../../controllers/expenses";
import {
  editPolicy,
  viewPolicy,
} from "../../middlewares/authorize/sheetPolicy";
import advancedResults from "../../middlewares/advancedResults";
import Expense from "../../models/Expense";
import expensePolicy from "../../middlewares/authorize/expensePolicy";
import { permission } from "../../middlewares/permission";
import sheet from "../../middlewares/sheet";

const router = express.Router({ mergeParams: true });
router.use(sheet, permission);

router
  .route("/")
  .get(
    advancedResults(Expense, {
      path: "sheet",
      select: "title owner",
    }),
    viewPolicy,
    getExpenses,
  )
  .post(editPolicy, addExpense);

router
  .route("/:id")
  .get([viewPolicy, expensePolicy], getExpense)
  .put([editPolicy, expensePolicy], updateExpense)
  .delete([editPolicy, expensePolicy], deleteExpense);

export default router;
