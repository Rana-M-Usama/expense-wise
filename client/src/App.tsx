import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

import { theme } from "theme";
import Sheets from "components/sheet/Sheets";
import About from "components/about/About";
import Expense from "components/expense/Expense";
import Home from "components/home/Home";
import NavBar from "components/common/layouts/navbar/Navbar";

import "App.css";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <header className="App-header">
        <NavBar />
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
