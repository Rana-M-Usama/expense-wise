import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
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
    width: "70px !important",
    height: "70px !important",
    backgroundColor: "#ff80ab !important",
  },

  icon: {
    width: "50% !important",
    height: "50% !important",
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
    backgroundColor: "white",
    transform: "translate(-50%, -50%)",
  },

  img: {
    height: "200px",
  },

  button: {
    "&:hover": { backgroundColor: "#f06292 !important" },
  },

  textField: {
    "& .MuiOutlinedInput-root:hover": {
      "& > fieldset": {
        borderColor: "#f06292",
      },
    },
  },
}));
