import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { ThemeProvider } from "@mui/material";

import LoginPage from "pages/login/login.page";
import ProfilePage from "pages/profile/profile.page";
import ResetPassword from "pages/resetpassword/resetpassword.page";
import SignupPage from "pages/signup/signup.page";
import { theme } from "theme";

import "App.css";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignupPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="reset_password" element={<ResetPassword />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </header>
    </ThemeProvider>
  );
};

export default App;
