import { useSelector } from "react-redux";

import type { RootState } from "app/store";

const isLoggedIn = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  return currentUser.id === "" ? false : true;
};

export { isLoggedIn };
