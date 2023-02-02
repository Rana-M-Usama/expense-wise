import { configureStore } from "@reduxjs/toolkit";

import { sheetReducer } from "slices/sheetSlice";
import { userReducer } from "components/user/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    sheet: sheetReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };
