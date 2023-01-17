import React from "react"
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
} from "@mui/material"

import useStyles from "./login.styles"
import logo from "../../assets/logo.png"

const LoginPage = () => {
  const classes = useStyles()

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
            xl: "40%",
            lg: "60%",
            md: "70%",
            sm: "90%",
          },
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            name="email"
            margin="normal"
            autoComplete="email"
            id="email"
            required
            fullWidth
            autoFocus
            label="Email Address"
            className={classes.textField}
          />
          <TextField
            margin="normal"
            name="password"
            label="Password"
            type="password"
            id="password"
            required
            fullWidth
            autoComplete="current-password"
            className={classes.textField}
          />
          <FormControlLabel
            control={<Checkbox value="remember" />}
            label="Remember me"
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            className={classes.button}
          >
            Sign in
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default LoginPage
