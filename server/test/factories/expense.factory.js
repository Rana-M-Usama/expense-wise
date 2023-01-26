import { faker } from "@faker-js/faker";

import Expense from "../../models/Expense";
import { SheetFactory } from "./sheet.factory";

const Sheet = SheetFactory();
const User = Sheet.owner;

const ExpenseFactory = ({
  title,
  type,
  status,
  amount,
  amountType,
  sheet,
  owner,
} = {}) =>
  new Expense({
    title: title || faker.lorem.words(1),
    type: type || faker.commerce.department(),
    status: status || "paid",
    amount: amount || faker.commerce.price(),
    amountType: amountType || "incoming",
    sheet: sheet || SheetFactory(),
    owner: owner || User,
  });

const buildExpenseList = async (quantity, sheet) => {
  await Promise.all(
    Array.from({ length: quantity }, () =>
      ExpenseFactory({ owner: sheet.owner, sheet }).save(),
    ),
  );
};

export { buildExpenseList, ExpenseFactory };
