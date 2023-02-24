import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { Lock } from "@mui/icons-material";
import { RootState } from "app/store";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  validateConfirmPassword,
  validateLoginPassword,
  validatePassword,
} from "validators/auth";
import Toast from "components/tostify/Toast";
import useHttp from "utils/useHttp";

import { styles } from "constants/styles";
import useStyles from "pages/resetpassword/resetpassword.styles";

const UpdatePasswordPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { loading, request, error, clearError } = useHttp();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const initialState = {
    oldPassword: { value: "", error: false, errorMessage: "" },
    newPassword: { value: "", error: false, errorMessage: "" },
    confirmPassword: { value: "", error: false, errorMessage: "" },
  };
  const [newPasswordData, setNewPasswordData] = useState(initialState);

  const changeHandlerData = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewPasswordData({
      ...newPasswordData,
      [name]: {
        value: value,
        error: false,
        errorMessage: "",
      },
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let { oldPassword, newPassword, confirmPassword } = newPasswordData;

    oldPassword = {
      ...oldPassword,
      ...validateLoginPassword(newPasswordData.oldPassword.value),
    };

    newPassword = {
      ...newPassword,
      ...validatePassword(newPasswordData.newPassword.value),
    };

    confirmPassword = {
      ...confirmPassword,
      ...validateConfirmPassword(
        newPasswordData.newPassword.value,
        newPasswordData.confirmPassword.value,
      ),
    };

    setNewPasswordData({ oldPassword, newPassword, confirmPassword });

    if (!(oldPassword.error || newPassword.error || confirmPassword.error)) {
      const payload = {
        currentPassword: newPasswordData.oldPassword.value,
        newPassword: newPasswordData.newPassword.value,
      };

      await request("/auth/me/password", "PUT", payload);

      if (!error) {
        Toast("success", "Password updated successfully.");
        setNewPasswordData(initialState);
        navigate("/");
      }
    }
  };

  const accountHandler = async () => {
    await request("/auth/forgot-password", "POST", {
      email: currentUser.email,
      url: "update-password",
    });

    if (!error) {
      Toast("success", "Check your email. We've sent a reset password link.");
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
      {!currentUser.isGoogleUser ? (
        <Container component="main" className={classes.container}>
          <CssBaseline />
          <Avatar className={classes.avatar}>
            <Lock className={classes.icon} />
          </Avatar>
          <Typography variant="h4">Update Password</Typography>
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
                id="old-password"
                sx={{ mt: 2 }}
                fullWidth
                label="Old Password *"
                autoComplete="current-password"
                className={classes.textField}
                type="password"
                placeholder="Old Password"
                name="oldPassword"
                value={newPasswordData.oldPassword.value}
                onChange={changeHandlerData}
                error={newPasswordData.oldPassword.error}
              />
              {newPasswordData.oldPassword.error && (
                <Box className={classes.errorMessage}>
                  {newPasswordData.oldPassword.errorMessage}
                </Box>
              )}
              <TextField
                color="primary"
                id="new-password"
                sx={{ mt: 2 }}
                fullWidth
                label="New Password *"
                autoComplete="current-password"
                className={classes.textField}
                type="password"
                placeholder="New Password"
                name="newPassword"
                value={newPasswordData.newPassword.value}
                onChange={changeHandlerData}
                error={newPasswordData.newPassword.error}
              />
              {newPasswordData.newPassword.error && (
                <Box className={classes.errorMessage}>
                  {newPasswordData.newPassword.errorMessage}
                </Box>
              )}
              <TextField
                color="primary"
                id="confirm-password"
                sx={{ mt: 2 }}
                fullWidth
                label="Confirm Password *"
                autoComplete="current-password"
                className={classes.textField}
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={newPasswordData.confirmPassword.value}
                onChange={changeHandlerData}
                error={newPasswordData.confirmPassword.error}
              />
              {newPasswordData.confirmPassword.error && (
                <Box className={classes.errorMessage}>
                  {newPasswordData.confirmPassword.errorMessage}
                </Box>
              )}
              <Button
                type="submit"
                fullWidth
                sx={{ mt: 3 }}
                variant="contained"
                disabled={loading}
              >
                {loading ? <CircularProgress size={25} /> : "Update Password"}
              </Button>
            </Box>
          </Box>
        </Container>
      ) : (
        <Container
          component="main"
          maxWidth="sm"
          sx={{
            boxShadow: 2,
            p: 5,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography>Email Address</Typography>
          <TextField
            disabled
            variant="outlined"
            inputProps={{ style: { padding: 7 } }}
            type="email"
            placeholder="Email"
            name="email"
            value={currentUser.email}
            sx={{ backgroundColor: styles.list.backgroundColor, mb: 2 }}
          />
          <Button
            onClick={accountHandler}
            variant="contained"
            startIcon={<GoogleIcon />}
            disabled={loading}
            sx={{
              maxWidth: "255px",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            {loading ? <CircularProgress size={25} /> : "Add Password"}
          </Button>
        </Container>
      )}
    </Box>
  );
};

export default UpdatePasswordPage;
