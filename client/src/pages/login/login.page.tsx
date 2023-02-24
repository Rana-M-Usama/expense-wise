import {
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";

import { validateEmail, validateLoginPassword } from "validators/auth";
import ForgotPasswordPage from "pages/forgotpassword/forgotpassword.page";
import { setCurrentUser } from "slices/userSlice";
import Toast from "components/tostify/Toast";
import useHttp from "utils/useHttp";

import googleIcon from "assets/Google.svg";
import logo from "assets/logo.png";
import useStyles from "pages/login/login.styles";

const LoginPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { loading, request, error, clearError } = useHttp();
  const [loginCredentials, setLoginCredentials] = useState({
    email: { value: "", error: false, errorMessage: "" },
    password: { value: "", error: false, errorMessage: "" },
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const changeHandlerData = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginCredentials({
      ...loginCredentials,
      [name]: {
        value: value,
        error: false,
        errorMessage: "",
      },
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let { email, password } = loginCredentials;

    email = { ...email, ...validateEmail(loginCredentials.email.value) };
    password = {
      ...password,
      ...validateLoginPassword(loginCredentials.password.value),
    };

    setLoginCredentials({ email, password });

    if (!(email.error || password.error)) {
      const response = await request("/auth/login", "POST", {
        email: email.value,
        password: password.value,
      });

      if (!error) {
        dispatch(setCurrentUser(response.data.user));
        Toast("success", "Logged in successfully.");
        localStorage.setItem("token", response.data.token);
        setLoginCredentials({
          email: { value: "", error: false, errorMessage: "" },
          password: { value: "", error: false, errorMessage: "" },
        });
        navigate("/");
      }
    }
  };

  const handleGoogleLoginSuccess = async (tokenResponse: any) => {
    const accessToken = tokenResponse.access_token;

    if (accessToken) {
      const response = await request("/auth/google-login", "POST", {
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

  useEffect(() => {
    if (error) {
      Toast("danger", error);
      clearError();
    }
  }, [error]);

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
            xl: "35%",
            lg: "35%",
            md: "40%",
            sm: "90%",
          },
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            autoComplete="email"
            id="email"
            fullWidth
            autoFocus
            label="Email Address *"
            className={classes.textField}
            placeholder="Email"
            name="email"
            value={loginCredentials.email.value}
            onChange={changeHandlerData}
            error={loginCredentials.email.error}
          />
          {loginCredentials.email.error && (
            <div className={classes.errorMessage}>
              {loginCredentials.email.errorMessage}
            </div>
          )}
          <FormControl
            fullWidth
            className={classes.textField}
            sx={{ mt: 2 }}
            variant="outlined"
          >
            <InputLabel htmlFor="password">Password *</InputLabel>
            <OutlinedInput
              label="Password *"
              autoComplete="current-password"
              name="password"
              value={loginCredentials.password.value}
              onChange={changeHandlerData}
              error={loginCredentials.password.error}
              id="password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {loginCredentials.password.error && (
            <div className={classes.errorMessage}>
              {loginCredentials.password.errorMessage}
            </div>
          )}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
            className={classes.button}
          >
            {loading ? <CircularProgress /> : "Sign in"}
          </Button>
          <Divider sx={{ mt: 1 }}>
            <Typography>or</Typography>
          </Divider>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => login()}
            className={classes.button}
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
        </Box>
        <Grid container>
          <Grid item xs>
            <Link
              component="button"
              onClick={() => setModalIsOpen(true)}
              variant="body2"
            >
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link component={RouterLink} to="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
        <ForgotPasswordPage
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
        />
      </Box>
    </Container>
  );
};

export default LoginPage;
