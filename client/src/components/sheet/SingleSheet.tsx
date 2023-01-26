import React, { useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import {
  StyledTableCell,
  StyledTableRow,
} from "components/sheet/SingleSheet.styles";
import ExpenseModal from "components/expense/ExpenseModal";

const createData = (
  title: string,
  type: string,
  status: string,
  amountType: string,
  amount: string,
) => {
  return { title, type, status, amount, amountType };
};

const rows = [
  createData("Hassan's Birthday", "Birthday", "paid", "incoming", "30000"),
  createData("Usama's Birthday", "Birthday", "paid", "incoming", "30000"),
  createData("Shaheer's Birthday", "Birthday", "paid", "incoming", "30000"),
  createData("Usman's Birthday", "Birthday", "paid", "incoming", "30000"),
  createData("Ali's Birthday", "Birthday", "paid", "incoming", "30000"),
  createData("Hassan's Birthday", "Birthday", "paid", "incoming", "30000"),
  createData("Usama's Birthday", "Birthday", "paid", "incoming", "30000"),
  createData("Shaheer's Birthday", "Birthday", "paid", "incoming", "30000"),
  createData("Usman's Birthday", "Birthday", "paid", "incoming", "30000"),
  createData("Ali's Birthday", "Birthday", "paid", "incoming", "30000"),
];

const headerRow = {
  "heading 1": "Title",
  "heading 2": "Type",
  "heading 3": "IN/OUT",
  "heading 4": "Status",
  "heading 5": "Amount",
  "heading 6": "Action",
};

type Response = {
  titleValue: string;
  typeValue: string;
  amountValue: string;
  statusValue: string;
  amountTypeValue: string;
};

type Props = Response & {
  buttonText: string;
};

const SingleSheet = () => {
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [modalProps, setModalProps] = useState<Props>({
    titleValue: "",
    typeValue: "",
    amountValue: "",
    statusValue: "",
    amountTypeValue: "",
    buttonText: "",
  });

  const showModal = (props: Props) => {
    setModalProps(props);
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container maxWidth="md">
      <ExpenseModal
        isOpen={IsModalOpen}
        {...modalProps}
        onClose={hideModal}
        onSubmit={(data: Response) => {
          console.log(data);
        }}
      />
      <Typography
        sx={{ mb: 5, display: "flex", justifyContent: "center" }}
        variant="h4"
      >
        Sheet 1
      </Typography>
      <Button
        sx={{ mb: 2 }}
        variant="outlined"
        size="small"
        onClick={() => showModal({ ...modalProps, buttonText: "Add Expense" })}
      >
        Add expense
      </Button>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            {Object.values(headerRow).map((heading) => (
              <StyledTableCell align="center">{heading}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.title}>
              <StyledTableCell component="th" scope="row">
                {row.title}
              </StyledTableCell>
              <StyledTableCell align="center">{row.type}</StyledTableCell>
              <StyledTableCell align="center">{row.amountType}</StyledTableCell>
              <StyledTableCell align="center">{row.status}</StyledTableCell>
              <StyledTableCell align="center">{row.amount}</StyledTableCell>
              <StyledTableCell align="center">
                <IconButton
                  aria-label="edit"
                  onClick={() =>
                    showModal({
                      titleValue: row.title,
                      typeValue: row.type,
                      amountValue: row.amount,
                      statusValue: row.status,
                      amountTypeValue: row.amountType,
                      buttonText: "Update Expense",
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

export default SingleSheet;
