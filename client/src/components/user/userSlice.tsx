import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type currentUser = {
  id: number | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  imageUrl: string | null;
};

type UserState = {
  currentUser: currentUser;
};

const initialState: UserState = {
  currentUser: {
    id: null,
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
