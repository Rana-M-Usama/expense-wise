import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Expense = {
  _id: string;
  title: string;
  type: string;
  status: string;
  amount: number;
  amountType: string;
  sheet: object;
  owner: object;
};

type ExpenseState = {
  expenses: Expense[];
};

const initialState: ExpenseState = {
  expenses: [],
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    setExpenses: (state, action: PayloadAction<{ data: Expense[] }>) => {
      state.expenses = action.payload.data;
    },
    setExpensesEmpty: state => {
      state.expenses = { ...initialState.expenses };
    },

    addExpense: (state, action: PayloadAction<{ data: Expense }>) => {
      state.expenses.push({ ...action.payload.data });
    },
    removeExpense: (
      state,
      action: PayloadAction<{ data: Expense; id: string }>,
    ) => {
      const expenseIndex = state.expenses.findIndex(
        expense => expense._id === action.payload.id,
      );
      state.expenses.splice(expenseIndex, 1);
    },
    modifyExpense: (
      state,
      action: PayloadAction<{ data: Expense; id: string }>,
    ) => {
      const expenseIndex = state.expenses.findIndex(
        expense => expense._id === action.payload.id,
      );
      const updateableExpense = state.expenses[expenseIndex];
      const updatedItem = { ...updateableExpense, ...action.payload.data };
      const updatedExpenses = [...state.expenses];
      updatedExpenses[expenseIndex] = updatedItem;
      state.expenses = updatedExpenses;
    },
  },
});

const expenseReducer = expenseSlice.reducer;
const {
  setExpenses,
  setExpensesEmpty,
  modifyExpense,
  removeExpense,
  addExpense,
} = expenseSlice.actions;

export {
  expenseReducer,
  setExpenses,
  setExpensesEmpty,
  modifyExpense,
  removeExpense,
  addExpense,
};
