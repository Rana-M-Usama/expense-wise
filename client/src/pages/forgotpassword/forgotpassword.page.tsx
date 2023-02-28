import {
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { CloseOutlined, Mail } from "@mui/icons-material";
import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import Toast from "components/tostify/Toast";
import useHttp from "utils/useHttp";
import { validateEmail } from "validators/auth";

import { styles } from "constants/styles";
import useStyles from "pages/forgotpassword/forgotpassword.styles";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ForgetPasswordPage: FC<Props> = ({ isOpen, onClose }) => {
  const classes = useStyles();
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: { value: "", error: false, errorMessage: "" },
  });
  const { loading, request, error, clearError } = useHttp();

  const changeHandlerData = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForgotPasswordData({
      ...forgotPasswordData,
      [name]: {
        value: value,
        error: false,
        errorMessage: "",
      },
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = {
      value: forgotPasswordData.email.value,
      ...validateEmail(forgotPasswordData.email.value),
    };

    setForgotPasswordData({ email });

    if (!email.error) {
      setForgotPasswordData({
        email: { value: "", error: false, errorMessage: "" },
      });

      await request("/auth/forgot-password", "POST", {
        email: email.value,
        url: "forget-password",
      });

      onClose();

      if (!error) {
        Toast("success", "Reset password instructions sent to your email.");
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
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        className={classes.modal}
        sx={{
          width: {
            lg: "40%",
            md: "60%",
            sm: "80%",
            xs: "95%",
          },
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "end",
            justifyContent: "end",
          }}
        >
          <IconButton onClick={onClose}>
            <CloseOutlined />
          </IconButton>
        </Box>
        <Typography variant="h4">Forgot Password?</Typography>
        <Typography sx={{ m: 1 }}>You can reset your password here</Typography>
        <Container>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              border: `1px solid ${styles.modalBox.border}`,
              p: 3,
              mb: 2,
            }}
          >
            <TextField
              margin="normal"
              id="email"
              autoComplete="email"
              label="Email Address *"
              fullWidth
              autoFocus
              className={classes.textField}
              placeholder="Email"
              name="email"
              value={forgotPasswordData.email.value}
              onChange={changeHandlerData}
              error={forgotPasswordData.email.error}
              InputProps={{
                startAdornment: (
                  <InputAdornment disableTypography position="start">
                    <Mail />
                  </InputAdornment>
                ),
              }}
            />
            {forgotPasswordData.email.error && (
              <div className={classes.errorMessage}>
                {forgotPasswordData.email.errorMessage}
              </div>
            )}
            <Button
              fullWidth
              type="submit"
              disabled={loading}
              variant="contained"
            >
              {loading ? <CircularProgress size={25} /> : "Send Email"}
            </Button>
          </Box>
        </Container>
      </Box>
    </Modal>
  );
};

export default ForgetPasswordPage;
