import { colors } from "constants/colors";
import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  container: {
    alignContent: "center",
    borderRadius: 15,
    width: "40%",
  },

  box: {
    display: "flex",
    flexDirection: "column",
  },

  textfield: {
    borderRadius: 7,
    backgroundColor: colors.list.backgroundColor,
  },
}));
