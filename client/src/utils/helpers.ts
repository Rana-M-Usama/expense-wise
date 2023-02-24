import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setCurrentUser, setCurrentUserEmpty } from "slices/userSlice";
import type { RootState } from "app/store";
import Toast from "components/tostify/Toast";
import useHttp from "./useHttp";

const useFetchUser = () => {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();
  const { request, error: requestError } = useHttp();

  useEffect(() => {
    setIsLogin(currentUser.id !== "");
  }, [currentUser]);

  const fetchUserData = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const { data } = await request("/auth/me", "GET", token);
        const currentUser = {
          id: data._id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          imageUrl: data.imageUrl,
          isGoogleUser: data.isGoogleUser,
        };
        dispatch(setCurrentUser(currentUser));
      } catch (error: any) {
        dispatch(setCurrentUserEmpty());
      }
    } else if (requestError) {
      Toast("danger", requestError);
    }
    setLoading(false);
  }, [request, requestError, dispatch]);

  return [loading, isLogin, fetchUserData];
};

const titleize = (str: string) => {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export { useFetchUser, titleize };
