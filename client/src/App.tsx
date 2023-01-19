import React, { useEffect, useState } from "react";
import { helloWorldApi } from "api/helloWorld";

import "App.css";
import logo from "assets/logo.png";

const App = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    helloWorldApi().then(response => {
      setData(response.expensewise);
    });
  }, [data]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>This is from backend {data}</h1>
      </header>
    </div>
  );
};

export default App;
