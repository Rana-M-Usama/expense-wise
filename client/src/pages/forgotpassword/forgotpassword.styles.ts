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

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    position: "absolute",
    top: "50%",
    left: "50%",
    padding: 2,
    borderRadius: 5,
    backgroundColor: styles.modal.backgroundColor,
    transform: "translate(-50%, -50%)",
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
    marginBottom: "8px",
  },
}));
