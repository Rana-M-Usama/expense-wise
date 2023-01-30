import Expense from "../models/Expense";

const calculateAmount = (expenses) =>
  expenses.reduce((sum, expense) => sum + expense.amount, 0);

const filterExpenses = (sheetId, status, amountType) =>
  Expense.find({ sheet: sheetId, status, amountType });

const calculateReceivedAmount = async (sheet) =>
  calculateAmount(await filterExpenses(sheet, "paid", "incoming"));

const calculatePendingAmount = async (sheet) =>
  calculateAmount(await filterExpenses(sheet, "unpaid", "incoming"));

const calculateSpentAmount = async (sheet) =>
  calculateAmount(await filterExpenses(sheet, "paid", "outgoing"));

const calculateTotalAmount = async (sheet) =>
  (await calculatePendingAmount(sheet)) +
  (await calculateReceivedAmount(sheet));

const isMongoId = (id) => {
  const checkForHexRegExp = /^[0-9a-fA-F]{24}$/;
  return checkForHexRegExp.test(id);
};

export {
  isMongoId,
  calculatePendingAmount,
  calculateReceivedAmount,
  calculateSpentAmount,
  calculateTotalAmount,
};
