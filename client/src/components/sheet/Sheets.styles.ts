import { makeStyles } from "@mui/styles";
import { styles } from "constants/styles";

export default makeStyles(() => ({
  openButton: {
    marginRight: 10,
    "&:hover": {
      color: styles.openButton.hoverColor,
      border: `1px solid ${styles.openButton.hoverBorderColor}`,
      background: `${styles.openButton.hoverBackgroundColor} !important`,
    },
  },
  editButton: {
    marginRight: 10,
    color: `${styles.editButton.color} !important`,
    border: `1px solid ${styles.editButton.border} !important`,
    "&:hover": {
      color: `${styles.editButton.hoverColor} !important`,
      border: `1px solid ${styles.editButton.hoverBorderColor}`,
    },
    [`@media (max-width: 576px)`]: {
      marginTop: 5,
    },
  },
  deleteButton: {
    marginRight: 10,
    color: `${styles.deleteButton.color} !important`,
    border: `1px solid ${styles.deleteButton.border} !important`,
    "&:hover": {
      color: `${styles.deleteButton.hoverColor} !important`,
      border: `1px solid ${styles.deleteButton.hoverBorderColor}`,
      background: `${styles.deleteButton.hoverBackgroundColor} !important`,
    },
    [`@media (max-width: 576px)`]: {
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
}));
