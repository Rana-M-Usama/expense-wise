import { Button, TableCell, tableCellClasses, TableRow } from "@mui/material";
import { colors } from "constants/colors";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: colors.tableCell.backgroundColor,
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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledButton = styled(Button)(() => ({
  color: `${colors.deleteButton.color} !important`,
  border: `1px solid ${colors.deleteButton.border} !important`,
  "&:hover": {
    color: `${colors.deleteButton.hoverColor} !important`,
    border: `1px solid ${colors.deleteButton.hoverBorderColor}`,
    background: `${colors.deleteButton.hoverBackgroundColor} !important`,
  },
}));

export { StyledTableCell, StyledTableRow, StyledButton };
