import { CircularProgress, ThemeProvider } from "@mui/material";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";

import { pingServer, useFetchUser } from "utils/helpers";
import Navbar from "components/common/layouts/navbar/Navbar";
import PrivateRoutes from "routes/PrivateRoutes";
import PublicRoutes from "routes/PublicRoutes";
import Toast from "components/tostify/Toast";

import "App.css";
import { theme } from "theme";

const App = () => {
  const [loading, isLogin, fetchUserData] = useFetchUser();

  useEffect(() => {
    const serverAvailability = async () => {
      const error = await pingServer();
      if (error) {
        Toast("danger", error);
      }
    };
    serverAvailability();
  }, []);

  useEffect(() => {
    if (typeof fetchUserData === "function") {
      fetchUserData();
    }
  }, [fetchUserData]);

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <div className="App-body-public">
          <CircularProgress />
        </div>
      ) : isLogin ? (
        <>
          <header className="App-header">
            <Navbar />
          </header>
          <div className="App-body">
            <PrivateRoutes />
          </div>
        </>
      ) : (
        <div className="App-body-public">
          <PublicRoutes />
        </div>
      )}
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
