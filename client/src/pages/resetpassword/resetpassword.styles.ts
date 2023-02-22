import { makeStyles } from "@mui/styles";
import { styles } from "constants/styles";

export default makeStyles(() => ({
  rootContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "cneter",
    height: "85vh",
    width: "100%",
  },

  container: {
    display: "flex !important",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },

  avatar: {
    margin: "10px !important",
    backgroundColor: `${styles.theme.primaryColor} !important`,
    width: "70px !important",
    height: "70px !important",
  },

  icon: {
    width: "50% !important",
    height: "50% !important",
  },

  img: {
    height: "200px",
  },

  textField: {
    "& .MuiOutlinedInput-root:hover": {
      "& > fieldset": {
        borderColor: styles.textField.hoverBorderColor,
      },
    },
  },

  errorMessage: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: "8px",
  },
}));
