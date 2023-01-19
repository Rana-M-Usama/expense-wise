import { TableCell, TableRow, tableCellClasses, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: "##f44336 !important",
  border: "1px solid ##f44336 !important",
  "&:hover": {
    background: "#f44336 !important",
    border: "1px solid #f4433680",
    color: "white !important",
  },
}));

const createData = (
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
  action: string
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

export { StyledTableCell, StyledTableRow, rows, StyledButton };
