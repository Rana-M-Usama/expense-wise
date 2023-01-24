import { ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import { theme } from "./theme";

import "./App.css";
import NavBar from "components/common/layouts/navbar/Navbar";
import Home from "components/home/Home";
import Sheet from "components/sheet/Sheet";
import Expense from "components/expense/Expense";
import About from "components/about/About";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sheets" element={<Sheet />} />
          <Route path="/expenses" element={<Expense />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </header>
    </ThemeProvider>
  );
};

export default App;
