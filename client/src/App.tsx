import { ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";

import { helloWorldApi } from "api/helloWorld";
import LoginPage from "pages/login/login.page";
import { theme } from "theme";

import "App.css";

const App = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    helloWorldApi().then(response => {
      setData(response.expensewise);
    });
  }, [data]);

  return (
    <ThemeProvider theme={theme}>
      <header className="App-header">
        <LoginPage />
      </header>
    </ThemeProvider>
  );
};

export default App;
