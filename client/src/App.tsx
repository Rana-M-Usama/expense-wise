import { useEffect, useState } from 'react'
import { ThemeProvider } from '@mui/material'

import { helloWorldApi } from './api/helloWorld'
import { theme } from './theme'

import './App.css'
import NavBar from 'components/common/layouts/navbar/Navbar'

const App = () => {
  const [data, setData] = useState('')

  useEffect(() => {
    helloWorldApi().then((response) => {
      setData(response.expensewise)
    })
  }, [data])

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <header className="App-header"></header>
    </ThemeProvider>
  )
}

export default App
