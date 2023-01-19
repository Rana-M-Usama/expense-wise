import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface currentUser {
  id: Number | null;
  firstName: String | null;
  lastName: String | null;
  email: String | null;
  imageUrl: String | null;
}

interface UserState {
  currentUser: currentUser;
}

const initialState: UserState = {
  currentUser: {
    id: 1,
    firstName: "test",
    lastName: "user",
    email: "test@gmail.com",
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
      state.currentUser = {
        id: null,
        firstName: null,
        lastName: null,
        imageUrl: null,
        email: null,
      };
    },
  },
});

export { userSlice };
export type { UserState };
export default userSlice.reducer;
export const { setCurrentUser, setCurrentUserEmpty } = userSlice.actions;
