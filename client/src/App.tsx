import { Route, Routes } from "react-router-dom";
import React from "react";
import { ThemeProvider } from "@mui/material";

import About from "components/about/About";
import LoginPage from "pages/login/login.page";
import Sheets from "components/sheet/Sheets";
import SignupPage from "pages/signup/signup.page";
import SingleSheet from "components/sheet/ExpenseSheet";

import "App.css";
import Navbar from "components/common/layouts/navbar/Navbar";
import { theme } from "theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <header className="App-header">
        <Navbar />
      </header>
      <div className="App-body">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/sheets" element={<Sheets />} />
          <Route path="/expenses" element={<SingleSheet />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
