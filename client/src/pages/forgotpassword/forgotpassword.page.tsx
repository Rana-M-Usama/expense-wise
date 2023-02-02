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
import React, { ChangeEvent, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import Toast from "components/tostify/Toast";
import useHttp from "utils/useHttp";

import { styles } from "constants/styles";
import useStyles from "pages/forgotpassword/forgotpassword.styles";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ForgetPasswordPage: React.FC<Props> = ({ isOpen, onClose }) => {
  const classes = useStyles();
  const [forgotPasswordData, setForgotPasswordData] = useState({ email: "" });
  const { loading, request, error, clearError } = useHttp();

  const changeHandlerData = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForgotPasswordData({ ...forgotPasswordData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await request("/auth/forgot-password", "POST", forgotPasswordData);

    if (!error) {
      setForgotPasswordData({ ...forgotPasswordData, email: "" });
      Toast("success", "Email sent successfully.");
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
        component="main"
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
              label="Email Address"
              required
              fullWidth
              autoFocus
              className={classes.textField}
              type="email"
              placeholder="Email"
              name="email"
              value={forgotPasswordData.email}
              onChange={changeHandlerData}
              InputProps={{
                startAdornment: (
                  <InputAdornment disableTypography position="start">
                    <Mail />
                  </InputAdornment>
                ),
              }}
            />
            <Button fullWidth type="submit" variant="contained">
              {loading ? <CircularProgress /> : "Send My Password"}
            </Button>
          </Box>
        </Container>
      </Box>
    </Modal>
  );
};

export default ForgetPasswordPage;
