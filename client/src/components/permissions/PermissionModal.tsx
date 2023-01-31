import {
  Avatar,
  Button,
  FormControl,
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
  validateEmail,
  validatePermissionType,
} from "validators/permission/permission";
import logo from "assets/logo.png";
import useStyles from "components/permissions/PermissionModal.styles";

type Response = {
  permissionTypeValue: string;
  emailValue: string;
};

type Props = Response & {
  isOpen: boolean;
  isUpdate: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: Response) => void;
};

const Permission = ({
  isOpen,
  permissionTypeValue,
  emailValue,
  isUpdate,
  onClose,
  onSubmit,
}: Props) => {
  const classes = useStyles();
  const [data, setData] = useState({
    permissionType: { value: "", error: false, errorMessage: "" },
    email: { value: "", error: false, errorMessage: "" },
  });

  useEffect(() => {
    setData({
      permissionType: {
        value: permissionTypeValue,
        error: false,
        errorMessage: "",
      },
      email: { value: emailValue, error: false, errorMessage: "" },
    });
  }, [permissionTypeValue, emailValue, onSubmit]);

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let { permissionType, email } = data;

    permissionType = {
      ...permissionType,
      ...validatePermissionType(permissionType.value),
    };
    email = { ...email, ...validateEmail(email.value) };

    setData({ permissionType, email });

    if (!permissionType.error && !email.error) {
      const responseData: Response = {
        permissionTypeValue: permissionType.value,
        emailValue: email.value,
      };

      onSubmit(responseData);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-email"
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
          <Typography id="modal-modal-email" variant="h6" component="h2">
            Permission
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            className={classes.textfield}
            sx={{ mt: 2 }}
            fullWidth
            id="email"
            label="Email*"
            value={data.email.value}
            onChange={handleChange}
            name="email"
          />
          {data.email.error && (
            <div className={classes.errorMessage}>
              {data.email.errorMessage}
            </div>
          )}

          <FormControl
            component="form"
            noValidate
            sx={{ mt: 2, width: "100%" }}
          >
            <InputLabel id="permissionType-label">Permission Type*</InputLabel>
            <Select
              className={classes.textfield}
              labelId="permissionType-label"
              label="permissionType*"
              id="permissionType"
              value={data.permissionType.value}
              onChange={handleSelectChange}
              name="permissionType"
              error={data.permissionType.error}
            >
              <MenuItem value="view">View</MenuItem>
              <MenuItem value="edit">Edit</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
            {data.permissionType.error && (
              <div className={classes.errorMessage}>
                {data.permissionType.errorMessage}
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

export default Permission;
