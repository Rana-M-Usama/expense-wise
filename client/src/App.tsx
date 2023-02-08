import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";

import { fetchUserData, isLoggedIn } from "utils/helpers";
import Navbar from "components/common/layouts/navbar/Navbar";
import PrivateRoutes from "routes/PrivateRoutes";
import PublicRoutes from "routes/PublicRoutes";

import "App.css";
import { theme } from "theme";

const App = () => {
  const getLoggedInUserDetails = fetchUserData();

  useEffect(() => {
    getLoggedInUserDetails();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <header className="App-header">{isLoggedIn() ? <Navbar /> : ""}</header>
      <div className="App-body">
        {isLoggedIn() ? <PrivateRoutes /> : <PublicRoutes />}
      </div>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
