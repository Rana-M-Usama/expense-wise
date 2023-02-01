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
import React from "react";

import { styles } from "constants/styles";
import useStyles from "pages/forgetpassword/forgetpassword.styles";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ForgetPasswordPage: React.FC<Props> = ({ isOpen, onClose }) => {
  const classes = useStyles();

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
        <Typography variant="h4">Forget Password?</Typography>
        <Typography sx={{ m: 1 }}>You can reset your password here</Typography>
        <Container>
          <Box
            component="form"
            sx={{
              border: `1px solid ${styles.modalBox.border}`,
              p: 3,
              mb: 2,
            }}
          >
            <TextField
              margin="normal"
              name="email"
              id="email"
              autoComplete="email"
              label="Email Address"
              required
              fullWidth
              autoFocus
              className={classes.textField}
              InputProps={{
                startAdornment: (
                  <InputAdornment disableTypography position="start">
                    <Mail />
                  </InputAdornment>
                ),
              }}
            />
            <Button fullWidth type="submit" variant="contained">
              Send My Password
            </Button>
          </Box>
        </Container>
      </Box>
    </Modal>
  );
};

export default ForgetPasswordPage;
