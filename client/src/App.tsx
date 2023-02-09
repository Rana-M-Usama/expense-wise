import { CircularProgress, ThemeProvider } from "@mui/material";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";

import Navbar from "components/common/layouts/navbar/Navbar";
import PrivateRoutes from "routes/PrivateRoutes";
import PublicRoutes from "routes/PublicRoutes";
import useFetchUser from "utils/helpers";

import "App.css";
import { theme } from "theme";

const App = () => {
  const [loading, isLogin, fetchUserData] = useFetchUser();

  useEffect(() => {
    if (typeof fetchUserData === "function") {
      fetchUserData();
    }
  }, [fetchUserData]);

  return (
    <ThemeProvider theme={theme}>
      <header className="App-header">{isLogin ? <Navbar /> : ""}</header>
      <div className="App-body">
        {loading ? (
          <CircularProgress />
        ) : isLogin ? (
          <PrivateRoutes />
        ) : (
          <PublicRoutes />
        )}
      </div>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
