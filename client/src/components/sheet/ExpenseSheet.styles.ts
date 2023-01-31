import { Paper, TableCell, tableCellClasses, TableRow } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";

import { colors } from "constants/colors";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: colors.theme.primaryColor,
    color: colors.tableCell.color,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const AmountBox = styled(Paper)(({ theme }) => ({
  backgroundColor: colors.amountBox.backgroundColor,
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: "white",
}));

const useStyles = makeStyles(() => ({
  addExpense: {
    "&:hover": {
      color: "white",
      background: `${colors.theme.primaryColor} !important`,
    },
  },
}));

export { useStyles, StyledTableCell, StyledTableRow, AmountBox };
