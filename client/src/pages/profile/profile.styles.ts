import { makeStyles } from "@mui/styles";
import { styles } from "constants/styles";

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
    backgroundColor: styles.list.backgroundColor,
  },

  errorMessage: {
    color: "red",
    fontSize: "0.8rem",
  },
}));
