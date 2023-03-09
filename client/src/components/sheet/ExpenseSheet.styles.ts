import { Paper, TableCell, tableCellClasses, TableRow } from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";

import { styles } from "constants/styles";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: styles.theme.primaryColor,
    color: styles.tableCell.color,
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
  "&:hover": {
    cursor: "pointer",
    textDecoration: "none",
  },
}));

const StyledLinkTableRow = styled(Link)`
  display: table-row;
  text-decoration: none;

  &:nth-of-type(odd) {
    background-color: ${({ theme }) => theme.palette.action.hover};
  }

  &:last-child td,
  &:last-child th {
    border: 0;
  }

  &:hover {
    cursor: pointer;
  }
`;

const AmountBox = styled(Paper)(({ theme }) => ({
  backgroundColor: styles.amountBox.backgroundColor,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "white",
}));

const useStyles = makeStyles(() => ({
  addExpense: {
    "&:hover": {
      color: "white",
      background: `${styles.theme.primaryColor} !important`,
    },
  },
  list: {
    borderRadius: 10,
    backgroundColor: styles.list.backgroundColor,
    height: "444px",
  },
  menuLink: {
    color: "black !important",
    textDecoration: "none !important",
  },
  tableContainer: {
    minHeight: "444px",
    backgroundColor: styles.list.backgroundColor,
  },

  totalOutterBox: {
    padding: 6,
    color: "white",
    background: styles.amountBox.backgroundColor,
  },

  totalBox: {
    flex: 1,
    padding: 6,
    border: "1px solid",
  },
}));

export {
  useStyles,
  StyledTableCell,
  StyledTableRow,
  StyledLinkTableRow,
  AmountBox,
};
