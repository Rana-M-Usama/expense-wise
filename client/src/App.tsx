import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material'

import { helloWorldApi } from "./api/helloWorld";
import logo from './assets/logo.png';
import { theme } from './theme'

import './App.css';

const App = () => {
  const [data, setData] = useState('')

  useEffect(() => {

    helloWorldApi()
      .then((response) => {
        setData(response.expensewise)
      })
  }, [data])

  return (
    <ThemeProvider theme={theme}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>This is from backend {data}</h1>
      </header>
    </ThemeProvider>
  );
}

export default App;
