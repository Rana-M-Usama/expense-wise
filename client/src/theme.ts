import { colors } from "constants/colors";
import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.theme.primaryColor,
    },
    secondary: {
      main: colors.theme.secondaryColor,
    },
  },
});
