import { ThemeProvider } from "@mui/material";

import NavBar from "components/common/layouts/navbar/Navbar";
import { theme } from "theme";

import "App.css";
import Sheets from "components/sheet/Sheets";
import SingleSheet from "components/sheet/SingleSheet";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <header className="App-header">
        <NavBar />
      </header>
      <body className="App-body">
        <SingleSheet />
      </body>
    </ThemeProvider>
  );
};

export default App;
