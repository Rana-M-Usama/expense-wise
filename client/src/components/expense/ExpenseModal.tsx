import {
  Avatar,
  Button,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Box } from "@mui/system";

import {
  validateAmount,
  validateAmountType,
  validateStatus,
  validateTitle,
  validateType,
} from "validators/expense";

import logo from "assets/logo.png";
import useStyles from "components/expense/ExpenseModal.styles";

type Response = {
  idValue: string;
  titleValue: string;
  typeValue: string;
  amountValue: number;
  statusValue: string;
  amountTypeValue: string;
};

type Props = Response & {
  isOpen: boolean;
  isUpdate: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: Response) => void;
};

const ExpenseModal = ({
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
}: Props) => {
  const classes = useStyles();

  const [data, setData] = useState({
    title: { value: "", error: false, errorMessage: "" },
    type: { value: "", error: false, errorMessage: "" },
    amount: { value: 0, error: false, errorMessage: "" },
    status: { value: "", error: false, errorMessage: "" },
    amountType: { value: "", error: false, errorMessage: "" },
  });

  useEffect(() => {
    setData({
      title: { value: titleValue, error: false, errorMessage: "" },
      type: { value: typeValue, error: false, errorMessage: "" },
      amount: { value: amountValue, error: false, errorMessage: "" },
      status: { value: statusValue, error: false, errorMessage: "" },
      amountType: { value: amountTypeValue, error: false, errorMessage: "" },
    });
  }, [
    titleValue,
    typeValue,
    amountValue,
    statusValue,
    amountTypeValue,
    onSubmit,
  ]);

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

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
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
    let { title, type, amount, status, amountType } = data;

    title = { ...title, ...validateTitle(title.value) };
    type = { ...type, ...validateType(type.value) };
    amount = { ...amount, ...validateAmount(amount.value) };
    status = { ...status, ...validateStatus(status.value) };
    amountType = { ...amountType, ...validateAmountType(amountType.value) };

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

        <Box>
          <TextField
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
            className={classes.textfield}
            sx={{ mt: 2 }}
            fullWidth
            id="type"
            label="type"
            value={data.type.value}
            onChange={handleChange}
            name="type"
            error={data.type.error}
          />
          {data.type.error && (
            <Box className={classes.errorMessage}>{data.type.errorMessage}</Box>
          )}

          <TextField
            className={classes.textfield}
            sx={{ mt: 2 }}
            fullWidth
            id="amount"
            label="amount"
            value={data.amount.value}
            onChange={handleChange}
            name="amount"
            error={data.amount.error}
          />
          {data.amount.error && (
            <Box className={classes.errorMessage}>
              {data.amount.errorMessage}
            </Box>
          )}

          <Box component="form" sx={{ mt: 2 }}>
            <InputLabel id="status-label">Status*</InputLabel>
            <Select
              sx={{ width: "100%" }}
              className={classes.textfield}
              labelId="status-label"
              label="Status*"
              id="status"
              value={data.status.value}
              onChange={handleSelectChange}
              name="status"
              error={data.status.error}
            >
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="unpaid">Unpaid</MenuItem>
            </Select>
            {data.status.error && (
              <Box className={classes.errorMessage}>
                {data.status.errorMessage}
              </Box>
            )}
          </Box>

          <Box component="form" sx={{ mt: 2 }}>
            <InputLabel id="amountType-label">Amount Type*</InputLabel>
            <Select
              sx={{ width: "100%" }}
              className={classes.textfield}
              labelId="amountType-label"
              label="Amount Type*"
              id="amountType"
              value={data.amountType.value}
              onChange={handleSelectChange}
              name="amountType"
              error={data.amountType.error}
            >
              <MenuItem value="incoming">Incoming</MenuItem>
              <MenuItem value="outgoing">Outgoing</MenuItem>
            </Select>
            {data.amountType.error && (
              <Box className={classes.errorMessage}>
                {data.amountType.errorMessage}
              </Box>
            )}
          </Box>

          <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            {isUpdate ? "Update Expense" : "Add Expense"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ExpenseModal;
