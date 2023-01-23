import {
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

import ForgotPasswordPage from "pages/forgetpassword/forgetpassword.page";
import logo from "assets/logo.png";
import useStyles from "pages/login/login.styles";

const LoginPage = () => {
  const classes = useStyles();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSubmit = () => {};

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
  );
};

export default LoginPage;
