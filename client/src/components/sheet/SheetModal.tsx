import { Avatar, Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Modal from "@mui/material/Modal";
import React from "react";

import logo from "assets/logo.png";
import useStyles from "components/sheet/SheetModal.styles";

type Props = {
  isOpen: boolean;
  title: string;
  button: string;
  name: string;
  description: string;
  onClose: () => void;
};

const SheetModal = ({
  isOpen,
  title,
  button,
  name,
  description,
  onClose,
}: Props) => {
  const classes = useStyles();

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
            lg: 420,
            md: 400,
            sm: 320,
            xs: 300,
          },
        }}
      >
        <Box className={classes.box}>
          <Avatar className={classes.avatar} src={logo} alt="expenseWise" />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
        </Box>

        <Box component="form" noValidate sx={{ mt: 2 }}>
          <TextField
            className={classes.textfield}
            margin="normal"
            required
            fullWidth
            id="name"
            label={name ? null : "Name"}
            value={name}
            name="name"
          />
          <TextField
            className={classes.textfield}
            multiline
            margin="normal"
            required
            fullWidth
            name="descrption"
            label={description ? null : "Description"}
            value={description}
            id="description"
          />
          <Box textAlign="center">
            <Button variant="contained" sx={{ mt: 5 }}>
              {button}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default SheetModal;
