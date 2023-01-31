import {
  Container,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

import {
  StyledButton,
  StyledTableCell,
  StyledTableRow,
} from "components/sheet/SingleSheet.styles";

const createData = (
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
  action: string,
) => {
  return { name, calories, fat, carbs, protein, action };
};

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, "delete"),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, "delete"),
  createData("Eclair", 262, 16.0, 24, 6.0, "delete"),
  createData("Cupcake", 305, 3.7, 67, 4.3, "delete"),
  createData("Gingerbread", 356, 16.0, 49, 3.9, "delete"),
  createData("Gingerbread", 356, 16.0, 49, 3.9, "delete"),
  createData("Gingerbread", 356, 16.0, 49, 3.9, "delete"),
];

const headerRow = {
  "heading 1": "Title",
  "heading 2": "Type",
  "heading 3": "IN/OUT",
  "heading 4": "Status",
  "heading 5": "Amount",
  "heading 6": "Action",
};

const SingleSheet = () => {
  return (
    <Container maxWidth="md">
      <Typography
        sx={{ mb: 5, display: "flex", justifyContent: "center" }}
        variant="h4"
      >
        Sheet 1
      </Typography>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            {Object.values(headerRow).map(heading => (
              <StyledTableCell key={heading}>{heading}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
              <StyledTableCell align="right">
                <StyledButton variant="outlined" color="error">
                  Delete
                </StyledButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default SingleSheet;
