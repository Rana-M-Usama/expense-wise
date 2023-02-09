import { makeStyles } from "@mui/styles";
import { styles } from "constants/styles";

export default makeStyles(() => ({
  openButton: {
    "&:hover": {
      color: styles.openButton.hoverColor,
      border: `1px solid ${styles.openButton.hoverBorderColor}`,
      background: `${styles.openButton.hoverBackgroundColor} !important`,
    },
  },
  editButton: {
    color: `${styles.editButton.color} !important`,
    border: `1px solid ${styles.editButton.border} !important`,
    "&:hover": {
      color: `${styles.editButton.hoverColor} !important`,
      border: `1px solid ${styles.editButton.hoverBorderColor}`,
      background: `${styles.editButton.hoverBackgroundColor} !important`,
    },
  },
  deleteButton: {
    color: `${styles.deleteButton.color} !important`,
    border: `1px solid ${styles.deleteButton.border} !important`,
    "&:hover": {
      color: `${styles.deleteButton.hoverColor} !important`,
      border: `1px solid ${styles.deleteButton.hoverBorderColor}`,
      background: `${styles.deleteButton.hoverBackgroundColor} !important`,
    },
  },
  list: {
    borderRadius: 10,
    backgroundColor: styles.list.backgroundColor,
    minHeight: "512px",
  },
  sheetNotFound: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "512px",
  },
}));
