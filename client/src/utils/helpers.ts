import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "app/store";
import { setCurrentUser } from "slices/userSlice";
import Toast from "components/tostify/Toast";
import useHttp from "./useHttp";

const isLoggedIn = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  return currentUser.id === "" ? false : true;
};

const fetchUserData = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { request, error: requestError } = useHttp();

  return async () => {
    if (token) {
      try {
        const { data } = await request("/auth/me", "GET", token);
        const currentUser = {
          id: data._id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          imageUrl: data.imageUrl,
        };
        dispatch(setCurrentUser(currentUser));
      } catch (error: any) {
        Toast("danger", error);
      }
    } else if (requestError) {
      Toast("danger", requestError);
    }
  };
};

export { isLoggedIn, fetchUserData };
