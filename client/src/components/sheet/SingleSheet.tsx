import {
  Container,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import {
  StyledTableCell,
  StyledTableRow,
  rows,
  StyledButton,
} from "components/sheet/SingleSheet.styles";

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
