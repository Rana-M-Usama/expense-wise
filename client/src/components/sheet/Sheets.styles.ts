import { makeStyles } from "@mui/styles";
import { styles } from "constants/styles";

export default makeStyles(() => ({
  openButton: {
    marginRight: "10px !important",
    "&:hover": {
      color: styles.openButton.hoverColor,
      border: `1px solid ${styles.openButton.hoverBorderColor}`,
      background: `${styles.openButton.hoverBackgroundColor} !important`,
    },
  },
  editButton: {
    marginRight: "10px !important",
    color: `${styles.editButton.color} !important`,
    border: `1px solid ${styles.editButton.border} !important`,
    "&:hover": {
      color: `${styles.editButton.hoverColor} !important`,
      background: `${styles.editButton.hoverBackgroundColor} !important`,
      border: `1px solid ${styles.editButton.hoverBorderColor}`,
    },
    [`@media (max-width: 666px)`]: {
      marginTop: 5,
    },
  },
  addSheet: {
    "&:hover": {
      color: "white",
      background: `${styles.theme.primaryColor} !important`,
    },
  },
  deleteButton: {
    marginRight: "10px !important",
    color: `${styles.deleteButton.color} !important`,
    border: `1px solid ${styles.deleteButton.border} !important`,
    "&:hover": {
      color: `${styles.deleteButton.hoverColor} !important`,
      border: `1px solid ${styles.deleteButton.hoverBorderColor}`,
      background: `${styles.deleteButton.hoverBackgroundColor} !important`,
    },
    [`@media (max-width: 666px)`]: {
      marginTop: 5,
    },
  },
  disabledButton: {
    marginRight: "10px !important",
    [`@media (max-width: 666px)`]: {
      marginTop: 5,
    },
  },
  list: {
    borderRadius: 10,
    backgroundColor: styles.list.backgroundColor,
    height: "444px",
  },
  tableContainer: {
    minHeight: "444px",
    backgroundColor: styles.list.backgroundColor,
  },
  buttonGroup: {
    [`@media (max-width: 666px)`]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },
}));
