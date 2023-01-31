import { makeStyles } from "@mui/styles";

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
  },

  box: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },

  avatar: {
    width: "30% !important",
    height: "30% !important",
  },

  textfield: {
    "& .MuiOutlinedInput-root:hover": {
      "& > fieldset": {
        borderColor: "#f06292",
      },
    },
  },
}));
