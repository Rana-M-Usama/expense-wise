const express = require("express");
const {
  getExpenses,
  getExpense,
  addExpense,
  updateExpense,
  deleteExpense,
} = require("../../controllers/expenses");

const Expense = require("../../models/Expense");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../../middlewares/advancedResults");
const { protect } = require("../../middlewares/auth");
const {
  expensePolicy,
  getExpensePolicy,
  updateExpensePolicy,
  deleteExpensePolicy,
} = require("../../middlewares/authorize/expensePolicy");
const { sheetPolicy } = require("../../middlewares/authorize/sheetPolicy");

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

module.exports = router;
