import { Route, Routes } from "react-router-dom";
import React from "react";
import { ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

import About from "components/about/About";
import LoginPage from "pages/login/login.page";
import Navbar from "components/common/layouts/navbar/Navbar";
import ProfilePage from "pages/profile/profile.page";
import ResetPassword from "pages/resetpassword/resetpassword.page";
import type { RootState } from "app/store";
import Sheets from "components/sheet/Sheets";
import SignupPage from "pages/signup/signup.page";
import SingleSheet from "components/sheet/ExpenseSheet";

import "App.css";
import { theme } from "theme";

const isLoggedIn = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  return currentUser.id === "" ? false : true;
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <header className="App-header">{isLoggedIn() ? <Navbar /> : ""}</header>
      <div className="App-body">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/sheets" element={<Sheets />} />
          <Route path="/expenses" element={<SingleSheet />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
