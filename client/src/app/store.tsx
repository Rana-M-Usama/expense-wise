import { configureStore } from "@reduxjs/toolkit";

import { expenseReducer } from "slices/expenseSlice";
import { permissionReducer } from "slices/permissionSlice";
import { sheetReducer } from "slices/sheetSlice";
import { userReducer } from "slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    sheet: sheetReducer,
    expense: expenseReducer,
    permission: permissionReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };
