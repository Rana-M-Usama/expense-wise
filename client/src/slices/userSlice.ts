import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type currentUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
};

type UserState = {
  currentUser: currentUser;
};

const initialState: UserState = {
  currentUser: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    imageUrl: "",
  },
};

const userSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<currentUser>) => {
      state.currentUser = action.payload;
    },
    setCurrentUserEmpty: state => {
      state.currentUser = { ...initialState.currentUser };
    },
  },
});

const userReducer = userSlice.reducer;
const { setCurrentUser, setCurrentUserEmpty } = userSlice.actions;

export { userReducer, setCurrentUser, setCurrentUserEmpty };
