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
  Grid,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import {
  StyledTableCell,
  StyledTableRow,
  RecievedAmount,
  RemainingAmount,
  TotalAmount,
} from "components/sheet/SingleSheet.styles";
import ExpenseModal from "components/expense/ExpenseModal";

const createData = (
  id: string,
  title: string,
  type: string,
  status: string,
  amountType: string,
  amount: string,
) => {
  return { id, title, type, status, amount, amountType };
};

const rows = [
  createData("1", "Hassan's Birthday", "Birthday", "paid", "incoming", "30000"),
  createData("2", "Usama's Birthday", "Birthday", "paid", "incoming", "30000"),
  createData("3", "Shaheer's Bike", "Bike", "unpaid", "incoming", "20000"),
  createData("4", "Usman's Birthday", "Birthday", "paid", "incoming", "30000"),
  createData("5", "Ali's Birthday", "Birthday", "paid", "incoming", "30000"),
  createData("6", "Hassan's Birthday", "Birthday", "paid", "incoming", "30000"),
  createData("7", "Usama's Birthday", "Birthday", "paid", "incoming", "20000"),
  createData("8", "saim's Birthday", "Birthday", "paid", "incoming", "32000"),
  createData("9", "Usman's Birthday", "Birthday", "paid", "incoming", "1900"),
  createData("10", "Ali's Birthday", "Birthday", "paid", "incoming", "30000"),
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
  idValue: string;
  titleValue: string;
  typeValue: string;
  amountValue: string;
  statusValue: string;
  amountTypeValue: string;
};

type Props = Response & {
  isUpdate: boolean;
};

const SingleSheet = () => {
  const initialProps = {
    idValue: "",
    titleValue: "",
    typeValue: "",
    amountValue: "",
    statusValue: "",
    amountTypeValue: "",
    isUpdate: false,
  };
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
      <ExpenseModal
        isOpen={IsModalOpen}
        {...modalProps}
        onClose={hideModal}
        onSubmit={(data: Response) => {
          if (data.idValue == "") {
            console.log("Create", data);
          } else {
            console.log("Update", data);
          }
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
        onClick={() => showModal({ ...modalProps })}
      >
        Add expense
      </Button>
      <Table aria-label="customized table" component={Paper}>
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
                      idValue: row.id,
                      titleValue: row.title,
                      typeValue: row.type,
                      amountValue: row.amount,
                      statusValue: row.status,
                      amountTypeValue: row.amountType,
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

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={2} sm={4} md={4} sx={{ mt: 10, mb: 10 }}>
          <RecievedAmount>Recieved Amount: 1000</RecievedAmount>
        </Grid>
        <Grid item xs={2} sm={4} md={4} sx={{ mt: 10, mb: 10 }}>
          <RemainingAmount>Remaining Amount: 12000</RemainingAmount>
        </Grid>
        <Grid item xs={2} sm={4} md={4} sx={{ mt: 10, mb: 10 }}>
          <TotalAmount>Total Amount: 13000</TotalAmount>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SingleSheet;
