import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  rootContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "cneter",
    height: "85vh",
  },

  container: {
    alignContent: "center",
    borderRadius: 15,
    width: "80%",
  },

  box: {
    display: "flex",
    flexDirection: "column",
  },

  textfield: {
    borderRadius: 7,
  },

  errorMessage: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: "8px",
  },
}));
