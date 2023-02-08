import { makeStyles } from "@mui/styles";
import { styles } from "constants/styles";

export default makeStyles(() => ({
  container: {
    width: "50%",
    display: "flex !important",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    [`@media (max-width: 1100px)`]: {
      width: "70%",
    },
    [`@media (max-width: 700px)`]: {
      width: "90%",
    },
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
  },
}));
