import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import { Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { validateConfirmPassword, validatePassword } from "validators/auth";
import Toast from "components/tostify/Toast";
import useHttp from "utils/useHttp";

import useStyles from "pages/resetpassword/resetpassword.styles";

const ResetPasswordPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { loading, request, error, clearError } = useHttp();

  const [resetPasswordData, setResetPasswordData] = useState({
    password: { value: "", error: false, errorMessage: "" },
    confirmPassword: { value: "", error: false, errorMessage: "" },
  });

  const changeHandlerData = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setResetPasswordData({
      ...resetPasswordData,
      [name]: {
        value: value,
        error: false,
        errorMessage: "",
      },
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let { password, confirmPassword } = resetPasswordData;

    password = {
      ...password,
      ...validatePassword(resetPasswordData.password.value),
    };
    confirmPassword = {
      ...confirmPassword,
      ...validateConfirmPassword(
        resetPasswordData.password.value,
        resetPasswordData.confirmPassword.value,
      ),
    };

    setResetPasswordData({ password, confirmPassword });

    if (!(password.error || confirmPassword.error)) {
      const payload = { password: resetPasswordData.password.value };
      await request("auth/reset-password/:reset_token}", "PUT", payload);

      if (!error) {
        Toast("success", "Successfully reset password.");
        setResetPasswordData({ password, confirmPassword });
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

  return (
    <Container component="main" className={classes.container}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <CssBaseline />
          <Avatar className={classes.avatar}>
            <Lock className={classes.icon} />
          </Avatar>
          <Typography variant="h4">Reset Password</Typography>
          <Box
            sx={{
              width: {
                lg: "50%",
                md: "70%",
                sm: "90%",
              },
            }}
          >
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                color="primary"
                margin="normal"
                id="password"
                fullWidth
                label="New Password"
                autoComplete="current-password"
                className={classes.textField}
                type="password"
                placeholder="Password"
                name="password"
                value={resetPasswordData.password.value}
                onChange={changeHandlerData}
                error={resetPasswordData.password.error}
              />
              {resetPasswordData.password.error && (
                <div className={classes.errorMessage}>
                  {resetPasswordData.password.errorMessage}
                </div>
              )}
              <TextField
                color="primary"
                margin="normal"
                id="password"
                fullWidth
                label="Confirm Password"
                autoComplete="current-password"
                className={classes.textField}
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={resetPasswordData.confirmPassword.value}
                onChange={changeHandlerData}
                error={resetPasswordData.confirmPassword.error}
              />
              {resetPasswordData.confirmPassword.error && (
                <div className={classes.errorMessage}>
                  {resetPasswordData.confirmPassword.errorMessage}
                </div>
              )}
              <Button type="submit" fullWidth variant="contained">
                Reset Password
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
};

export default ResetPasswordPage;
