import { colors } from "constants/colors";
import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  openButton: {
    "&:hover": {
      color: colors.openButton.hoverColor,
      border: `1px solid ${colors.openButton.hoverBorderColor}`,
      background: `${colors.openButton.hoverBackgroundColor} !important`,
    },
  },
  editButton: {
    color: `${colors.editButton.color} !important`,
    border: `1px solid ${colors.editButton.border} !important`,
    "&:hover": {
      color: `${colors.editButton.hoverColor} !important`,
      border: `1px solid ${colors.editButton.hoverBorderColor}`,
      background: `${colors.editButton.hoverBackgroundColor} !important`,
    },
  },
  deleteButton: {
    color: `${colors.deleteButton.color} !important`,
    border: `1px solid ${colors.deleteButton.border} !important`,
    "&:hover": {
      color: `${colors.deleteButton.hoverColor} !important`,
      border: `1px solid ${colors.deleteButton.hoverBorderColor}`,
      background: `${colors.deleteButton.hoverBackgroundColor} !important`,
    },
  },
  list: {
    borderRadius: 10,
    backgroundColor: colors.list.backgroundColor,
  },
}));
