import { Avatar, Button, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Box } from "@mui/system";
import Modal from "@mui/material/Modal";

import logo from "assets/logo.png";
import useHttp from "utils/useHttp";
import useStyles from "components/sheet/SheetModal.styles";

type Props = {
  isOpen: boolean;
  modalTitle: string;
  button: string;
  id: string;
  title: string;
  description: string;
  onClose: () => void;
  fetchData: () => void;
};

const SheetModal = ({
  isOpen,
  modalTitle,
  button,
  id,
  title,
  description,
  onClose,
  fetchData,
}: Props) => {
  const classes = useStyles();
  const { request, error, clearError } = useHttp();
  const [sheetData, setSheetData] = useState({ title: "", description: "" });

  useEffect(() => {
    setSheetData({
      title,
      description,
    });
  }, [title, description]);

  const changeHandlerData = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSheetData({ ...sheetData, [name]: value });
  };

  const handleSubmit = async () => {
    if (button === "Create") {
      await request("/sheets", "POST", sheetData);

      if (!error) {
        alert("Successfully created sheet.");
        clearError();
        fetchData();
        onClose();
      }
    } else {
      await request(`/sheets/${id}`, "PUT", sheetData);

      if (!error) {
        alert("Successfully updated sheet.");
        clearError();
        fetchData();
        onClose();
      }
    }
  };

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
            {modalTitle}
          </Typography>
        </Box>

        <Box component="form" noValidate sx={{ mt: 2 }}>
          <TextField
            className={classes.textfield}
            margin="normal"
            required
            fullWidth
            id="title"
            label={title ? null : "Title"}
            value={sheetData.title}
            onChange={changeHandlerData}
            name="title"
          />
          <TextField
            className={classes.textfield}
            multiline
            margin="normal"
            required
            fullWidth
            name="description"
            label={description ? null : "Description"}
            value={sheetData.description}
            onChange={changeHandlerData}
            id="description"
          />
          <Box textAlign="center">
            <Button onClick={handleSubmit} variant="contained" sx={{ mt: 5 }}>
              {button}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default SheetModal;
