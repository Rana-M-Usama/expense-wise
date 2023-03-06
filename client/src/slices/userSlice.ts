import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type currentUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string | undefined;
  isGoogleUser: boolean;
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
    isGoogleUser: false,
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
      localStorage.removeItem("token");
    },
    modifyCurrentUser: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
  },
});

const userReducer = userSlice.reducer;
const { setCurrentUser, setCurrentUserEmpty, modifyCurrentUser } =
  userSlice.actions;

export { userReducer, setCurrentUser, setCurrentUserEmpty, modifyCurrentUser };
