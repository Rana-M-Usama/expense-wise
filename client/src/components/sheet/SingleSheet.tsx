import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#E31C79",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
  action: string
  ) {
  return { name, calories, fat, carbs, protein, action };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, "delete"),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, "delete"),
  createData("Eclair", 262, 16.0, 24, 6.0, "delete"),
  createData("Cupcake", 305, 3.7, 67, 4.3, "delete"),
  createData("Gingerbread", 356, 16.0, 49, 3.9, "delete"),
  createData("Gingerbread", 356, 16.0, 49, 3.9, "delete"),
  createData("Gingerbread", 356, 16.0, 49, 3.9, "delete"),
];

const SingleSheet = () => {
  return (
    <Container maxWidth="md">
      <Typography
        variant="h4"
      >
        Sheet 1
      </Typography>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell align="right">Type</StyledTableCell>
            <StyledTableCell align="right">IN/OUT</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  sx={{
                    color: "##f44336 !important",
                    border: "1px solid ##f44336 !important",
                    "&:hover": {
                      background: "#f44336 !important",
                      border: "1px solid #f4433680",
                      color: "white !important",
                    },
                  }}
                  variant="outlined"
                  color="error"
                >
                  Delete
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default SingleSheet;
