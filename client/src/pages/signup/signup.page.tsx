import {
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";

import {
  validateConfirmPassword,
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePassword,
} from "validators/auth";
import Toast from "components/tostify/Toast";
import useHttp from "utils/useHttp";

import googleIcon from "assets/Google.svg";
import logo from "assets/logo.png";
import { setCurrentUser } from "slices/userSlice";
import useStyles from "pages/signup/signup.styles";

const SignupPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, request, error, clearError } = useHttp();

  const [signupData, setSignupData] = useState({
    firstName: { value: "", error: false, errorMessage: "" },
    lastName: { value: "", error: false, errorMessage: "" },
    email: { value: "", error: false, errorMessage: "" },
    password: { value: "", error: false, errorMessage: "" },
    confirmPassword: { value: "", error: false, errorMessage: "" },
  });

  const changeHandlerData = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignupData({
      ...signupData,
      [name]: {
        value: value,
        error: false,
        errorMessage: "",
      },
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let { confirmPassword, email, firstName, lastName, password } = signupData;

    email = { ...email, ...validateEmail(signupData.email.value) };
    password = { ...password, ...validatePassword(signupData.password.value) };
    confirmPassword = {
      ...confirmPassword,
      ...validateConfirmPassword(
        signupData.password.value,
        signupData.confirmPassword.value,
      ),
    };
    firstName = {
      ...firstName,
      ...validateFirstName(signupData.firstName.value),
    };
    lastName = {
      ...lastName,
      ...validateLastName(signupData.lastName.value),
    };

    setSignupData({ firstName, lastName, password, confirmPassword, email });

    if (
      !(
        firstName.error ||
        lastName.error ||
        email.error ||
        confirmPassword.error ||
        password.error
      )
    ) {
      await request("/auth/register", "POST", {
        firstName: signupData.firstName.value,
        lastName: signupData.lastName.value,
        email: signupData.email.value,
        password: signupData.password.value,
      });

      if (!error) {
        Toast(
          "success",
          "You're registered! Check your email to activate your account.",
        );
        setSignupData({
          firstName: { value: "", error: false, errorMessage: "" },
          lastName: { value: "", error: false, errorMessage: "" },
          email: { value: "", error: false, errorMessage: "" },
          password: { value: "", error: false, errorMessage: "" },
          confirmPassword: { value: "", error: false, errorMessage: "" },
        });
        navigate("/");
      }
    }
  };

  useEffect(() => {
    if (error) {
      Toast("danger", error);
      clearError();
    }
  }, [error]);

  const handleGoogleLoginSuccess = async (res: any) => {
    const accessToken = res.access_token;

    if (accessToken) {
      const response = await request("/auth/google-register", "POST", {
        googleAccessToken: accessToken,
      });

      if (!error) {
        dispatch(setCurrentUser(response.data.user));
        Toast("success", "Logged in successfully.");
        localStorage.setItem("token", response.data.token);
        navigate("/");
      }
    }
  };

  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });

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
                id="firstName"
                label="First Name"
                required
                fullWidth
                autoFocus
                type="text"
                placeholder="First Name"
                name="firstName"
                value={signupData.firstName.value}
                onChange={changeHandlerData}
                error={signupData.firstName.error}
              />
              {signupData.firstName.error && (
                <div className={classes.errorMessage}>
                  {signupData.firstName.errorMessage}
                </div>
              )}
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
                value={signupData.lastName.value}
                onChange={changeHandlerData}
                error={signupData.lastName.error}
              />
              {signupData.lastName.error && (
                <div className={classes.errorMessage}>
                  {signupData.lastName.errorMessage}
                </div>
              )}
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
                value={signupData.email.value}
                onChange={changeHandlerData}
                error={signupData.email.error}
              />
              {signupData.email.error && (
                <div className={classes.errorMessage}>
                  {signupData.email.errorMessage}
                </div>
              )}
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
                value={signupData.password.value}
                onChange={changeHandlerData}
                error={signupData.password.error}
              />
              {signupData.password.error && (
                <div className={classes.errorMessage}>
                  {signupData.password.errorMessage}
                </div>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                required
                fullWidth
                label="Confirm Password"
                id="Confirm password"
                type="password"
                placeholder="Confirm password"
                name="confirmPassword"
                value={signupData.confirmPassword.value}
                onChange={changeHandlerData}
                error={signupData.confirmPassword.error}
              />
              {signupData.confirmPassword.error && (
                <div className={classes.errorMessage}>
                  {signupData.confirmPassword.errorMessage}
                </div>
              )}
            </Grid>
          </Grid>
          <Button
            className={classes.button}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            {loading ? <CircularProgress sx={{ color: "white" }} /> : "Sign Up"}
          </Button>
          <Divider sx={{ mt: 1 }}>
            <Typography>or</Typography>
          </Divider>
          <Button
            className={classes.button}
            fullWidth
            variant="outlined"
            onClick={() => login()}
            startIcon={
              <Box
                sx={{ height: "30px" }}
                component="img"
                src={googleIcon}
                alt="googeIcon"
              />
            }
          >
            Sign in with Google
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
    </Container>
  );
};

export default SignupPage;
