import Expense from "../models/Expense";

const calculateAmount = (data, status, amountType) =>
  data
    .filter((item) => item.status === status && item.amountType === amountType)
    .reduce((sum, expense) => sum + expense.amount, 0);

const amountStats = async (sheetId) => {
  const expenses = await Expense.find({ sheet: sheetId });
  const receivedAmount = calculateAmount(expenses, "paid", "incoming");
  const pendingAmount = calculateAmount(expenses, "unpaid", "incoming");
  const spentAmount = calculateAmount(expenses, "paid", "outgoing");
  return {
    receivedAmount,
    pendingAmount,
    spentAmount,
    totalAmount: receivedAmount + pendingAmount,
  };
};

const isMongoId = (id) => {
  const checkForHexRegExp = /^[0-9a-fA-F]{24}$/;
  return checkForHexRegExp.test(id);
};

export { isMongoId, amountStats };
