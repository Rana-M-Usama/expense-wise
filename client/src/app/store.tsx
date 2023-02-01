import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };
