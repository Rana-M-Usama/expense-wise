import { makeStyles } from "@mui/styles";
import { styles } from "constants/styles";

export default makeStyles(() => ({
  modal: {
    top: "50%",
    left: "50%",
    width: 400,
    padding: 20,
    borderRadius: "10px",
    position: "absolute",
    backgroundColor: "white",
    boxShadow: "20 !important",
    transform: "translate(-50%, -50%)",
    [`@media (max-width: 450px)`]: {
      maxWidth: "250px",
    },
  },

  box: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },

  avatar: {
    width: 150,
    height: 90,
    borderRadius: 0,
    marginBottom: 10,
  },

  textfield: {
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
