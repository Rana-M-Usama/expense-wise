import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { MouseEvent, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import {
  AmountBox,
  StyledTableCell,
  StyledTableRow,
  useStyles,
} from "components/sheet/ExpenseSheet.styles";
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

const ExpenseSheet = () => {
  const initialProps = {
    idValue: "",
    titleValue: "",
    typeValue: "",
    amountValue: "",
    statusValue: "",
    amountTypeValue: "",
    isUpdate: false,
  };
  const classes = useStyles();
  const [sheetOption, setSheetOption] = useState<null | Element>(null);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setSheetOption(event.currentTarget as Element);
  };
  const handleClose = () => {
    setSheetOption(null);
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
          if (data.idValue === "") {
            console.log("Create", data);
            hideModal();
          } else {
            console.log("Update", data);
            hideModal();
          }
        }}
      />
      <Typography
        sx={{ mb: 5, display: "flex", justifyContent: "center" }}
        variant="h4"
      >
        Sheet 1
      </Typography>
      <Box display="flex" justifyContent="space-between">
        <Button
          className={classes.addExpense}
          sx={{ mb: 2 }}
          variant="outlined"
          size="small"
          onClick={() => showModal({ ...modalProps })}
        >
          Add expense
        </Button>
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={sheetOption}
          keepMounted
          open={Boolean(sheetOption)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Delete Sheet</MenuItem>
          <MenuItem onClick={handleClose}>Sheet Permissions</MenuItem>
        </Menu>
      </Box>
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
        columns={{ xs: 8, sm: 16, md: 16 }}
      >
        <Grid item xs={2} sm={4} md={4} style={{ width: "20%" }}>
          <AmountBox>Recieved: 10000</AmountBox>
        </Grid>
        <Grid item xs={2} sm={4} md={4} style={{ width: "20%" }}>
          <AmountBox>Remaining: 12000</AmountBox>
        </Grid>
        <Grid item xs={2} sm={4} md={4} style={{ width: "20%" }}>
          <AmountBox>Total: 13000</AmountBox>
        </Grid>
        <Grid item xs={2} sm={4} md={4} style={{ width: "20%" }}>
          <AmountBox>Spent: 10000</AmountBox>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExpenseSheet;
