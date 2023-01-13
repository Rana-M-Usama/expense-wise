import React, { useEffect, useState } from 'react'
import { ThemeProvider } from '@mui/material'

import { helloWorldApi } from './api/helloWorld'
import logo from './assets/logo.png'
import { theme } from './theme'

import './App.css'
import LoginPage from 'pages/login/login.page'

const App = () => {
  const [data, setData] = useState('')

  useEffect(() => {
    helloWorldApi().then((response) => {
      setData(response.expensewise)
    })
  }, [data])

  return (
    <ThemeProvider theme={theme}>
      <header className="App-header">
        <LoginPage />
      </header>
    </ThemeProvider>
  )
}

export default App
