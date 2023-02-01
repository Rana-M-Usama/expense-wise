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
import { useDispatch } from "react-redux";

import ForgotPasswordPage from "pages/forgotpassword/forgotpassword.page";
import { setCurrentUser } from "components/user/userSlice";
import Toast from "components/tostify/Toast";
import useHttp from "utils/useHttp";

import logo from "assets/logo.png";
import useStyles from "pages/login/login.styles";

const LoginPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { loading, request, error, clearError } = useHttp();
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  const changeHandlerData = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginCredentials({ ...loginCredentials, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await request("/auth/login", "POST", loginCredentials);

    if (!error) {
      dispatch(setCurrentUser(response.data.user));
      Toast("success", "Successfully logged in.");
      localStorage.setItem("token", response.data.token);
      setLoginCredentials({ ...loginCredentials, email: "", password: "" });
      navigate("/profile");
    }
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
                margin="normal"
                autoComplete="email"
                id="email"
                required
                fullWidth
                autoFocus
                label="Email Address"
                className={classes.textField}
                type="email"
                placeholder="Email"
                name="email"
                value={loginCredentials.email}
                onChange={changeHandlerData}
              />
              <TextField
                margin="normal"
                label="Password"
                type="password"
                id="password"
                required
                fullWidth
                autoComplete="current-password"
                className={classes.textField}
                name="password"
                value={loginCredentials.password}
                onChange={changeHandlerData}
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
                    component="button"
                    onClick={() => setModalIsOpen(true)}
                    href="#"
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
            </Box>
            <ForgotPasswordPage
              isOpen={modalIsOpen}
              onClose={() => setModalIsOpen(false)}
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default LoginPage;
