import Expense from "../models/Expense";

const calculateTotalAmount = (expenses) =>
  expenses.reduce((sum, expense) => sum + expense.amount, 0);

const filterExpenses = (sheetId, status, amountType) =>
  Expense.find({ sheet: sheetId, status, amountType });

const receivedAmount = async (sheet) =>
  calculateTotalAmount(await filterExpenses(sheet, "paid", "incoming"));

const pendingAmount = async (sheet) =>
  calculateTotalAmount(await filterExpenses(sheet, "unpaid", "incoming"));

const spentAmount = async (sheet) =>
  calculateTotalAmount(await filterExpenses(sheet, "paid", "outgoing"));

const totalAmount = async (sheet) =>
  (await pendingAmount(sheet)) + (await receivedAmount(sheet));

const isMongoId = (id) => {
  const checkForHexRegExp = /^[0-9a-fA-F]{24}$/;
  return checkForHexRegExp.test(id);
};

export { isMongoId, pendingAmount, receivedAmount, spentAmount, totalAmount };
