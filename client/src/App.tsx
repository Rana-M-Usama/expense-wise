import { Route, Routes } from "react-router-dom";
import React from "react";
import { ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";

import About from "components/about/About";
import LoginPage from "pages/login/login.page";
import ProfilePage from "pages/profile/profile.page";
import ResetPassword from "pages/resetpassword/resetpassword.page";
import Sheets from "components/sheet/Sheets";
import SignupPage from "pages/signup/signup.page";
import SingleSheet from "components/sheet/ExpenseSheet";

import "App.css";
import { theme } from "theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <header className="App-header">
        {/* Navbar will be show if user is signed in */}
      </header>
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
