import React from "react";
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
} from "@mui/material";

import logo from "assets/logo.png";
import useStyles from "pages/signup/signup.styles";

const SignupPage = () => {
  const classes = useStyles();

  const handleSubmit = () => {};

  return (
    <Container component="main" className={classes.container}>
      <CssBaseline />
      <Box
        className={classes.img}
        src={logo}
        component="img"
        alt="expenseWise"
      />
      <Box
        sx={{
          width: {
            xl: "50%",
            lg: "60%",
            md: "70%",
            sm: "90%",
          },
        }}
      >
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.textField}
                autoComplete="given-name"
                name="firstName"
                id="firstName"
                label="First Name"
                required
                fullWidth
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.textField}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                required
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                label="Email Address"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
              <TextField
                className={classes.textField}
                margin="normal"
                type="password"
                required
                fullWidth
                name="Confirm password"
                label="Confirm Password"
                id="Confirm password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" />}
                label="I want to receive inspiration, marketing
                      promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            className={classes.button}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignupPage;
