import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Modal,
} from "@mui/material";

import logo from "assets/logo.png";
import useStyles from "components/expense/ExpenseModal.styles";

type Response = {
  idValue: string;
  titleValue: string;
  typeValue: string;
  amountValue: string;
  statusValue: string;
  amountTypeValue: string;
};

type Props = Response & {
  isOpen: boolean;
  isUpdate: boolean;
  onClose: () => void;
  onSubmit: (data: Response) => void;
};

const ExpenseModal = (props: Props) => {
  const {
    isOpen,
    idValue,
    titleValue,
    typeValue,
    amountValue,
    statusValue,
    amountTypeValue,
    isUpdate,
    onClose,
    onSubmit,
  } = props;

  const classes = useStyles();

  const [data, setData] = useState({
    title: { value: titleValue, error: false, errorMessage: "" },
    type: { value: typeValue, error: false, errorMessage: "" },
    amount: { value: amountValue, error: false, errorMessage: "" },
    status: { value: statusValue, error: false, errorMessage: "" },
    amountType: { value: amountTypeValue, error: false, errorMessage: "" },
  });

  useEffect(() => {
    let formData = { ...data };
    formData.title.value = titleValue;
    formData.type.value = typeValue;
    formData.amount.value = amountValue;
    formData.status.value = statusValue;
    formData.amountType.value = amountTypeValue;

    setData(formData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [titleValue, typeValue, amountValue, statusValue, amountTypeValue]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const regex = /^[0-9]*\.?[0-9]+$/;
    let { title, type, amount, status, amountType } = data;

    if (title.value === "") {
      title.error = true;
      title.errorMessage = "Title is required.";
    } else if (title.value.length > 100) {
      title.error = true;
      title.errorMessage = "Title can not be longer than 100 characters.";
    } else {
      title.error = false;
      title.errorMessage = "";
    }

    if (type.value === "") {
      type.error = true;
      type.errorMessage = "Type is required";
    } else if (type.value.length > 100) {
      type.error = true;
      type.errorMessage = "Type can not be longer than 100 characters.";
    } else {
      type.error = false;
      type.errorMessage = "";
    }

    if (amount.value === "") {
      amount.error = true;
      amount.errorMessage = "Amount is required";
    } else if (!regex.test(amount.value)) {
      amount.error = true;
      amount.errorMessage = "Amount must be valid positive number.";
    } else {
      amount.error = false;
      amount.errorMessage = "";
    }

    if (status.value === "") {
      status.error = true;
      status.errorMessage = "Status is required";
    } else {
      status.error = false;
      status.errorMessage = "";
    }

    if (amountType.value === "") {
      amountType.error = true;
      amountType.errorMessage = "Amount type is required";
    } else {
      amountType.error = false;
      amountType.errorMessage = "";
    }

    setData({ title, type, amount, status, amountType });

    if (
      !title.error &&
      !type.error &&
      !amount.error &&
      !status.error &&
      !amountType.error
    ) {
      const responseData: Response = {
        idValue: idValue,
        titleValue: title.value,
        typeValue: type.value,
        amountValue: amount.value,
        statusValue: status.value,
        amountTypeValue: amountType.value,
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
        <Box className={classes.box}>
          <Avatar className={classes.avatar} src={logo} alt="expenseWise" />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Expense
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            className={classes.textfield}
            sx={{ mt: 2 }}
            fullWidth
            id="title"
            label="Title"
            value={data.title.value}
            onChange={(e) => {
              let formData = { ...data };
              formData.title.value = e.target.value;
              setData(formData);
            }}
            name="title"
            error={data.title.error}
          />
          {data.title.error && (
            <div className={classes.errorMessage}>
              {data.title.errorMessage}
            </div>
          )}

          <TextField
            className={classes.textfield}
            sx={{ mt: 2 }}
            fullWidth
            id="type"
            label="type"
            value={data.type.value}
            onChange={(e) => {
              let formData = { ...data };
              formData.type.value = e.target.value;
              setData(formData);
            }}
            name="type"
            error={data.type.error}
          />
          {data.type.error && (
            <div className={classes.errorMessage}>{data.type.errorMessage}</div>
          )}

          <TextField
            className={classes.textfield}
            sx={{ mt: 2 }}
            fullWidth
            id="amount"
            label="amount"
            value={data.amount.value}
            onChange={(e) => {
              let formData = { ...data };
              formData.amount.value = e.target.value;
              setData(formData);
            }}
            name="amount"
            error={data.amount.error}
          />
          {data.amount.error && (
            <div className={classes.errorMessage}>
              {data.amount.errorMessage}
            </div>
          )}

          <FormControl
            component="form"
            noValidate
            sx={{ mt: 2, width: "100%" }}
          >
            <InputLabel id="status-label">Status*</InputLabel>
            <Select
              className={classes.textfield}
              labelId="status-label"
              label="Status*"
              id="status"
              value={data.status.value}
              onChange={(e) => {
                let formData = { ...data };
                formData.status.value = e.target.value;
                setData(formData);
              }}
              name="status"
              error={data.status.error}
            >
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="unpaid">Unpaid</MenuItem>
            </Select>
            {data.status.error && (
              <div className={classes.errorMessage}>
                {data.status.errorMessage}
              </div>
            )}
          </FormControl>

          <FormControl
            component="form"
            noValidate
            sx={{ mt: 2, width: "100%" }}
          >
            <InputLabel id="amountType-label">Amount Type*</InputLabel>
            <Select
              className={classes.textfield}
              labelId="amountType-label"
              label="Amount Type*"
              id="amountType"
              value={data.amountType.value}
              onChange={(e) => {
                let formData = { ...data };
                formData.amountType.value = e.target.value;
                setData(formData);
              }}
              name="amountType"
              error={data.amountType.error}
            >
              <MenuItem value="incoming">Incoming</MenuItem>
              <MenuItem value="outgoing">Outgoing</MenuItem>
            </Select>
            {data.amountType.error && (
              <div className={classes.errorMessage}>
                {data.amountType.errorMessage}
              </div>
            )}
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            {isUpdate ? "Update Expense" : "Add Expense"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ExpenseModal;
