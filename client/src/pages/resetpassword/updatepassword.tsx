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
import { Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import {
  validateConfirmPassword,
  validateLoginPassword,
  validatePassword,
} from "validators/auth";
import Toast from "components/tostify/Toast";
import useHttp from "utils/useHttp";

import useStyles from "pages/resetpassword/resetpassword.styles";

const UpdatePasswordPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { loading, request, error, clearError } = useHttp();
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

  useEffect(() => {
    if (error) {
      Toast("danger", error);
      clearError();
    }
  }, [error]);

  return (
    <Box className={classes.rootContainer}>
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
              <div className={classes.errorMessage}>
                {newPasswordData.oldPassword.errorMessage}
              </div>
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
              <div className={classes.errorMessage}>
                {newPasswordData.newPassword.errorMessage}
              </div>
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
              <div className={classes.errorMessage}>
                {newPasswordData.confirmPassword.errorMessage}
              </div>
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
    </Box>
  );
};

export default UpdatePasswordPage;
