import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "app/store";
import { setCurrentUser } from "slices/userSlice";
import useHttp from "./useHttp";

const isLoggedIn = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  return currentUser.id === "" ? false : true;
};

const fetchUserData = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const { request, error } = useHttp();

  return async () => {
    if (token) {
      const { data } = await request("/auth/me", "GET", token);
      const currentUser = {
        id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        imageUrl: data.imageUrl,
      };
      if (!error) {
        dispatch(setCurrentUser(currentUser));
      }
    }
  };
};

export { isLoggedIn, fetchUserData };
