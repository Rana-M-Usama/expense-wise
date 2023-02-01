import { createTheme } from "@mui/material";
import { styles } from "constants/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: styles.theme.primaryColor,
    },
    secondary: {
      main: styles.theme.secondaryColor,
    },
  },
});
