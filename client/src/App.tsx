import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material";

import { helloWorldApi } from "api/helloWorld";
import NavBar from "components/common/layouts/navbar/Navbar";
import SingleSheet from "components/sheet/SingleSheet";
import { theme } from "theme";

import "App.css";
import Sheets from "components/sheet/Sheets";

const App = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    helloWorldApi().then((response) => {
      setData(response.expensewise);
    });
  }, [data]);

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
