import { makeStyles } from "@mui/styles";
import { styles } from "constants/styles";

export default makeStyles(() => ({
  container: {
    flexDirection: "column",
    display: "flex !important",
    justifyContent: "center",
    alignItems: "center",
    [`@media (max-width: 1100px)`]: {
      width: "70%",
    },
    [`@media (max-width: 700px)`]: {
      width: "90%",
    },
  },

  avatar: {
    margin: "10px !important",
    backgroundColor: `${styles.theme.secondaryColor} !important`,
    width: "70px !important",
    height: "70px !important",
  },

  button: {
    marginTop: "10px !important",
    height: "50px",
  },

  icon: {
    width: "50% !important",
    height: "50% !important",
  },

  modal: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: 2,
    borderRadius: 5,
  },

  img: {
    height: "170px",
    marginBottom: 20,
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
