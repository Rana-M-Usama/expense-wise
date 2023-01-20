import React from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Avatar,
  Typography,
  Container,
} from "@mui/material";
import { Lock } from "@mui/icons-material";

import useStyles from "pages/resetpassword/resetpassword.styles";

const ResetPasswordPage = () => {
  const classes = useStyles();
  const handleSubmit = () => {};

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
            type="password"
            id="password"
            name="password"
            required
            fullWidth
            label="New Password"
            autoComplete="current-password"
            className={classes.textField}
          />
          <TextField
            color="primary"
            margin="normal"
            type="password"
            id="password"
            name="password"
            required
            fullWidth
            label="Confirm Password"
            autoComplete="current-password"
            className={classes.textField}
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
