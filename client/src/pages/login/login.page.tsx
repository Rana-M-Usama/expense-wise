import React, { useState } from 'react'
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Container,
} from '@mui/material'

import ForgotPasswordPage from 'pages/forgetpassword/forgetpassword.page'
import useStyles from './login.styles'
import logo from '../../assets/logo.png'

const LoginPage = () => {
  const classes = useStyles()
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {}

  return (
    <Container component="main" className={classes.container}>
      <CssBaseline />
      <Box
        component="img"
        className={classes.img}
        src={logo}
        alt="expenseWise"
      />
      <Box
        sx={{
          width: {
            xl: '40%',
            lg: '60%',
            md: '70%',
            sm: '90%',
          },
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            className={classes.textField}
          />
          <TextField
            color="primary"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            className={classes.textField}
          />
          <FormControlLabel
            control={<Checkbox value="remember" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.button}
          >
            Sign in
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                onClick={() => setModalIsOpen(true)}
                href="#"
                variant="body2"
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <ForgotPasswordPage
            isOpen={modalIsOpen}
            onClose={() => setModalIsOpen(false)}
          />
        </Box>
      </Box>
    </Container>
  )
}

export default LoginPage
