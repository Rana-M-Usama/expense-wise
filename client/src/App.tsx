import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material";

import { helloWorldApi } from "api/helloWorld";
import NavBar from "components/common/layouts/navbar/Navbar";
import SingleSheet from "components/sheet/SingleSheet";
import { theme } from "theme";

import "App.css";

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
        <SingleSheet />
      </body>
    </ThemeProvider>
  );
};

export default App;
