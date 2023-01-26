import { Route, Routes } from "react-router-dom";
import React from "react";
import { ThemeProvider } from "@mui/material";

import About from "components/about/About";
import Expense from "components/expense/Expense";
import Home from "components/home/Home";
import Sheets from "components/sheet/Sheets";
import { theme } from "theme";

import "App.css";
import LoginPage from "pages/login/login.page";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <header className="App-header">
        <LoginPage />
      </header>
      <div className="App-body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sheets" element={<Sheets />} />
          <Route path="/expenses" element={<Expense />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
