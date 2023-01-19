import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material";

import { helloWorldApi } from "api/helloWorld";
import { theme } from "theme";
import LoginPage from "pages/login/login.page";

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
