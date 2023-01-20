import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  container: {
    width: "50%",
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
    backgroundColor: "#ff80ab !important",
    width: "70px !important",
    height: "70px !important",
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
