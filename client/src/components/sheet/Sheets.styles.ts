import { makeStyles } from "@mui/styles"

export default makeStyles((theme) => ({
  openButton: {
    "&:hover": {
      color: "white",
      border: "1px solid #E31C7980",
      background: "#E31C79 !important",
    },
  },

  editButton: {
    color: "#455a64 !important",
    border: "1px solid #455a64 !important",
    "&:hover": {
      color: "white !important",
      border: "1px solid #455a6480",
      background: "#455a64 !important",
    },
  },

  deleteButton: {
    color: "##f44336 !important",
    border: "1px solid ##f44336 !important",
    "&:hover": {
      color: "white !important",
      border: "1px solid #f4433680",
      background: "#f44336 !important",
    },

  }
}))
