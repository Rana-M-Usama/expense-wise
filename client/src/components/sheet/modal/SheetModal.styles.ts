import { makeStyles } from "@mui/styles"

export default makeStyles((theme) => ({
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "white",
    paddingTop: 20,
    padding: 20,
    paddingBottom: 20,
    boxShadow: "20 !important"
  },

  box: {
    display: "flex",
    justifyContent: "center"
  },

  avatar: {
    width: "30% !important",
    height: "30% !important"
  },

  textfield: {
    "& .MuiOutlinedInput-root:hover": {
      "& > fieldset": {
        borderColor: "#f06292",
      },
    },

  }
}))
