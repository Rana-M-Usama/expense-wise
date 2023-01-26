import { Route, Routes } from "react-router-dom";
import React from "react";
import { ThemeProvider } from "@mui/material";

import About from "components/about/About";
import Expense from "components/expense/Expense";
import LoginPage from "pages/login/login.page";
import Navbar from "components/common/layouts/navbar/Navbar";
import Sheets from "components/sheet/Sheets";
import { theme } from "theme";

import "App.css";

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
          <Route path="/expenses" element={<Expense />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
