import {
  Avatar,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Box } from "@mui/system";
import { CloseOutlined } from "@mui/icons-material";

import { validateDescription, validateTitle } from "validators/sheet";

import logo from "assets/logo.png";
import useStyles from "components/expense/ExpenseModal.styles";

type Response = {
  idValue: string;
  titleValue: string;
  descriptionValue: string;
};

type Props = Response & {
  isOpen: boolean;
  isUpdate: boolean;
  loading: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: Response) => void;
};

const SheetModal = ({
  isOpen,
  idValue,
  titleValue,
  descriptionValue,
  isUpdate,
  onClose,
  onSubmit,
  loading,
}: Props) => {
  const classes = useStyles();
  const [data, setData] = useState({
    title: { value: "", error: false, errorMessage: "" },
    description: { value: "", error: false, errorMessage: "" },
  });

  useEffect(() => {
    setData({
      title: { value: titleValue, error: false, errorMessage: "" },
      description: {
        value: descriptionValue,
        error: false,
        errorMessage: "",
      },
    });
  }, [titleValue, descriptionValue, onSubmit]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: {
        value: e.target.value,
        error: false,
        errorMessage: "",
      },
    });
  };

  const handleSubmit = () => {
    let { title, description } = data;
    title = { ...title, ...validateTitle(title.value) };
    description = { ...description, ...validateDescription(description.value) };

    setData({ title, description });

    if (!(title.error || description.error)) {
      const responseData: Response = {
        idValue: idValue,
        titleValue: title.value,
        descriptionValue: description.value,
      };

      onSubmit(responseData);
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <IconButton sx={{ p: 0 }} onClick={onClose}>
            <CloseOutlined />
          </IconButton>
        </Box>
        <Box className={classes.box}>
          <Avatar className={classes.avatar} src={logo} alt="expenseWise" />
        </Box>

        <Box>
          <TextField
            required
            className={classes.textfield}
            sx={{ mt: 2 }}
            fullWidth
            id="title"
            label="Title"
            value={data.title.value}
            onChange={handleChange}
            name="title"
            error={data.title.error}
          />
          {data.title.error && (
            <Box className={classes.errorMessage}>
              {data.title.errorMessage}
            </Box>
          )}

          <TextField
            required
            className={classes.textfield}
            sx={{ mt: 2 }}
            fullWidth
            id="description"
            label="Description"
            value={data.description.value}
            onChange={handleChange}
            name="description"
            error={data.description.error}
          />
          {data.description.error && (
            <Box className={classes.errorMessage}>
              {data.description.errorMessage}
            </Box>
          )}

          <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={25} />
            ) : isUpdate ? (
              "Update Sheet"
            ) : (
              "Add Sheet"
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SheetModal;
