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
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

import Toast from "components/tostify/Toast";
import useHttp from "utils/useHttp";

import logo from "assets/logo.png";
import useStyles from "pages/signup/signup.styles";

const SignupPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { loading, request, error, clearError } = useHttp();

  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const changeHandlerData = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (signupData.password === signupData.confirmPassword) {
      await request("/auth/register", "POST", signupData);

      if (!error) {
        Toast("success", "Successfully signed up.");
        navigate("/");
      }
    } else Toast("danger", "Invalid data.");
  };

  useEffect(() => {
    if (error) {
      Toast("danger", error);
      clearError();
    }
  }, [error]);

  return (
    <Container component="main" className={classes.container}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
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
                    id="firstName"
                    label="First Name"
                    required
                    fullWidth
                    autoFocus
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={signupData.firstName}
                    onChange={changeHandlerData}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.textField}
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    autoComplete="family-name"
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={signupData.lastName}
                    onChange={changeHandlerData}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.textField}
                    required
                    fullWidth
                    id="email"
                    autoComplete="email"
                    label="Email Address"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={signupData.email}
                    onChange={changeHandlerData}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.textField}
                    required
                    fullWidth
                    label="Password"
                    id="password"
                    autoComplete="new-password"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={signupData.password}
                    onChange={changeHandlerData}
                  />
                  <TextField
                    className={classes.textField}
                    margin="normal"
                    required
                    fullWidth
                    label="Confirm Password"
                    id="Confirm password"
                    type="password"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={signupData.confirmPassword}
                    onChange={changeHandlerData}
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
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link component={RouterLink} to="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
};

export default SignupPage;
