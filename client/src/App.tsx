import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material";

import { helloWorldApi } from "api/helloWorld";
import { theme } from "theme";

import "App.css";
import SignupPage from "pages/signup/signup.page";

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
        <SignupPage />
      </header>
    </ThemeProvider>
  );
};

export default App;
