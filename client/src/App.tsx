import { ThemeProvider } from "@mui/material";

import NavBar from "components/common/layouts/navbar/Navbar";
import { theme } from "theme";

import "App.css";
import Sheets from "components/sheet/Sheets";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <header className="App-header">
        <NavBar />
      </header>
      <div className="App-body">
        <Sheets />
      </div>
    </ThemeProvider>
  );
};

export default App;
