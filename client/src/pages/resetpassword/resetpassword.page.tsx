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
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Lock } from "@mui/icons-material";
import { useDispatch } from "react-redux";

import { validateConfirmPassword, validatePassword } from "validators/auth";
import { setCurrentUserEmpty } from "slices/userSlice";
import Toast from "components/tostify/Toast";
import useHttp from "utils/useHttp";

import useStyles from "pages/resetpassword/resetpassword.styles";

const ResetPasswordPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { resetToken } = useParams<{ resetToken: string | undefined }>();
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
      const payload = {
        password: resetPasswordData.password.value,
      };
      const response = await request(
        `/auth/reset-password/${resetToken}`,
        "PUT",
        payload,
      );

      if (!error) {
        Toast("success", "Password reset successfully.");
        setResetPasswordData({ password, confirmPassword });
        dispatch(setCurrentUserEmpty(response.data.user));
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
    <Box className={classes.rootContainer}>
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
                  id="password"
                  sx={{ mt: 2 }}
                  fullWidth
                  label="New Password *"
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
                  id="password"
                  sx={{ mt: 2 }}
                  fullWidth
                  label="Confirm Password *"
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

                <Button
                  type="submit"
                  fullWidth
                  sx={{ mt: 3 }}
                  variant="contained"
                >
                  Reset Password
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default ResetPasswordPage;
