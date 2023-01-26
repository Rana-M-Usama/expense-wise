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
import React, { ChangeEvent, useState } from "react";

import { forgotPasswordApi } from "api/auth";
import Toast from "components/tostify/Toast";

import useStyles from "pages/forgotpassword/forgotpassword.styles";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPasswordPage: React.FC<Props> = ({ isOpen, onClose }) => {
  const classes = useStyles();
  const [forgotPasswordData, setForgotPasswordData] = useState({ email: "" });

  const changeHandlerData = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForgotPasswordData({ ...forgotPasswordData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    forgotPasswordApi(forgotPasswordData)
      .then(() => {
        setForgotPasswordData({ ...forgotPasswordData, email: "" });
        Toast("success", "Email sent successfully.");
      })
      .catch(error => {
        Toast("danger", error.message);
      });
  };

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
              border: "1px solid #f0629270",
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
            <Button
              fullWidth
              type="submit"
              variant="contained"
              className={classes.button}
            >
              Send My Password
            </Button>
          </Box>
        </Container>
      </Box>
    </Modal>
  );
};

export default ForgotPasswordPage;
