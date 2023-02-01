import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Lock } from "@mui/icons-material";

import Toast from "components/tostify/Toast";
import useHttp from "utils/useHttp";

import useStyles from "pages/resetpassword/resetpassword.styles";

const ResetPasswordPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { loading, request, error, clearError } = useHttp();

  const [resetPasswordData, setResetPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });

  const changeHandlerData = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setResetPasswordData({ ...resetPasswordData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { resetToken } = useParams<{ resetToken: string | undefined }>();

    if (resetPasswordData.password === resetPasswordData.confirmPassword) {
      const payload = { password: resetPasswordData.password };
      await request(`auth/reset-password/${resetToken}`, "PUT", payload);

      if (!error) {
        Toast("success", "Successfully reset password.");
        setResetPasswordData({
          ...resetPasswordData,
          password: "",
          confirmPassword: "",
        });
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
                required
                fullWidth
                label="New Password"
                autoComplete="current-password"
                className={classes.textField}
                type="password"
                placeholder="Password"
                name="password"
                value={resetPasswordData.password}
                onChange={changeHandlerData}
              />
              <TextField
                color="primary"
                margin="normal"
                id="password"
                required
                fullWidth
                label="Confirm Password"
                autoComplete="current-password"
                className={classes.textField}
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={resetPasswordData.confirmPassword}
                onChange={changeHandlerData}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.button}
              >
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
