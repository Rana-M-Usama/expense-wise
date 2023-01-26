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
import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import ForgotPasswordPage from "pages/forgotpassword/forgotpassword.page";
import { loginApi } from "api/auth";
import { setCurrentUser } from "components/user/userSlice";
import Toast from "components/tostify/Toast";

import logo from "assets/logo.png";
import useStyles from "pages/login/login.styles";

const LoginPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const changeHandlerData = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    loginApi(loginData)
      .then(response => {
        Toast("success", "Successfully logined in.");
        setLoginData({ ...loginData, email: "", password: "" });
        dispatch(setCurrentUser(response.data.data.user));
        localStorage.setItem("token", response.data.data.token);
        navigate("/profile");
      })
      .catch(error => {
        Toast("danger", error.message);
      });
  };

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
            value={loginData.email}
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
            value={loginData.password}
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
        </Box>
        <ForgotPasswordPage
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
        />
      </Box>
    </Container>
  );
};

export default LoginPage;
