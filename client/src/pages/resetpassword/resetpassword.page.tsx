import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Lock } from "@mui/icons-material";

import { resetPasswordApi } from "api/auth";
import Toast from "components/tostify/Toast";

import useStyles from "pages/resetpassword/resetpassword.styles";

const ResetPasswordPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

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
      resetPasswordApi(resetPasswordData, resetToken)
        .then(() => {
          Toast("success", "Successfully reset password.");
          setResetPasswordData({
            ...resetPasswordData,
            password: "",
            confirmPassword: "",
          });
          navigate("/login");
        })
        .catch(error => {
          Toast("danger", error.message);
        });
    } else Toast("danger", "Invalid data.");
  };

  return (
    <Container component="main" className={classes.container}>
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
    </Container>
  );
};

export default ResetPasswordPage;
