import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import { styles } from "constants/styles";

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
    "& .MuiOutlinedInput-root:hover": {
      "& > fieldset": {
        borderColor: styles.textField.hoverBorderColor,
      },
    },
    borderRadius: 7,
  },

  errorMessage: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: "8px",
  },

  menuItem: {
    cursor: "pointer",
  },
}));

const SmallAvatar = styled(CameraAltIcon)(({ theme }) => ({
  width: 35,
  height: 35,
  padding: 5,
  borderRadius: 50,
  cursor: "pointer",
  color: styles.theme.primaryColor,
  border: `2px solid ${theme.palette.background.paper}`,
  backgroundColor: styles.list.backgroundColor,
}));

export { SmallAvatar };
