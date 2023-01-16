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
  sheetPolicy,
  viewPolicy,
} from "../../middlewares/authorize/sheetPolicy";
import advancedResults from "../../middlewares/advancedResults";
import Expense from "../../models/Expense";
import expensePolicy from "../../middlewares/authorize/expensePolicy";
import { permissionPolicy } from "../../middlewares/authorize/permissionPolicy";

const router = express.Router({ mergeParams: true });
router.use(sheetPolicy, permissionPolicy);

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
