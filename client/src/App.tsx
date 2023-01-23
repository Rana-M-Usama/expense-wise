import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material";

import { helloWorldApi } from "api/helloWorld";
import NavBar from "components/common/layouts/navbar/Navbar";
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
      <body className="App-body">
        <Sheets />
      </body>
    </ThemeProvider>
  );
};

export default App;
