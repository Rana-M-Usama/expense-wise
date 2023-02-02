import {
  Button,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import {
  StyledTableCell,
  StyledTableRow,
  useStyles,
} from "components/permissions/Permissions.styles";
import PermissionModal from "components/permissions/PermissionModal";

const createData = (permissionType: string, email: string) => {
  return { permissionType, email };
};

const rows = [
  createData("edit", "usmanjaved@gmail.com"),
  createData("admin", "aliusman@gmail.com"),
  createData("view", "Shaheer@gmail.com"),
  createData("view", "irfan@gmail.com"),
  createData("edit", "usama@gmail.com"),
  createData("admin", "hamzaazeem@gmail.com"),
  createData("view", "ahmedjaved@gmail.com"),
];

const headerRow = {
  "heading 1": "Permission Type",
  "heading 2": "User",
  "heading 3": "Action",
};

type Response = {
  permissionTypeValue: string;
  emailValue: string;
};

type Props = Response & {
  isUpdate: boolean;
};

const Permissions = () => {
  const initialProps = {
    permissionTypeValue: "",
    emailValue: "",
    isUpdate: false,
  };
  const classes = useStyles();
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [modalProps, setModalProps] = useState<Props>(initialProps);

  const showModal = (props: Props) => {
    setModalProps(props);
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setModalProps(initialProps);
    setIsModalOpen(false);
  };

  return (
    <Container maxWidth="md">
      <PermissionModal
        isOpen={IsModalOpen}
        {...modalProps}
        onClose={hideModal}
        onSubmit={(data: Response) => {
          console.log("Data", data);
        }}
      />
      <Typography
        sx={{ mb: 5, display: "flex", justifyContent: "center" }}
        variant="h4"
      >
        Sheet 1 Permissions
      </Typography>
      <Button
        className={classes.addExpense}
        sx={{ mb: 2 }}
        variant="outlined"
        size="small"
        onClick={() => showModal({ ...modalProps })}
      >
        Add Permission
      </Button>
      <Table
        aria-label="customized table"
        sx={{ minWidth: 650, mb: 5 }}
        size="small"
        component={Paper}
      >
        <TableHead>
          <TableRow>
            {Object.values(headerRow).map(heading => (
              <StyledTableCell key={heading} align="center">
                {heading}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <StyledTableRow key={row.email}>
              <StyledTableCell component="th" scope="row">
                {row.email}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.permissionType}
              </StyledTableCell>
              <StyledTableCell align="center">
                <IconButton
                  aria-label="edit"
                  onClick={() =>
                    showModal({
                      permissionTypeValue: row.permissionType,
                      emailValue: row.email,
                      isUpdate: true,
                    })
                  }
                >
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => {}}>
                  <DeleteIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default Permissions;
