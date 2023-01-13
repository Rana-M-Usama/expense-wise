import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface currentUser {
  id: Number | null;
  email: String | null;
  username: String | null;
}

export interface UserState {
  currentUser: currentUser;
}

const initialState: UserState = {
  currentUser: { id: 1, username: "test", email: "test@gmail.com" },
};

export const userSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<currentUser>) => {
      console.log("Set current user");
      state.currentUser = action.payload;
    },
    emptyCurrentUser: state => {
      console.log("Empty current user");
      state.currentUser = {
        id: null,
        email: null,
        username: null,
      };
    },
  },
});

export const { setCurrentUser, emptyCurrentUser } = userSlice.actions;

export default userSlice.reducer;
