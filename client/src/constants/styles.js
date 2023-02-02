import {
  amountBoxBackground,
  deleteButtonColor,
  editButtonColor,
  hoverBorderColor,
  hoverColor,
  listBackground,
  modalBackground,
  modalBoxBorder,
  primaryColor,
  secondaryColor,
  userAvatarBorder,
} from "./colors";

export const styles = {
  editButton: {
    color: editButtonColor,
    border: editButtonColor,
    hoverColor,
    hoverBorderColor: `${editButtonColor}80`,
    hoverBackgroundColor: editButtonColor,
  },
  deleteButton: {
    color: deleteButtonColor,
    border: deleteButtonColor,
    hoverColor,
    hoverBorderColor: `${deleteButtonColor}80`,
    hoverBackgroundColor: deleteButtonColor,
  },
  list: {
    backgroundColor: listBackground,
  },
  modal: {
    backgroundColor: modalBackground,
  },
  modalBox: {
    border: modalBoxBorder,
  },
  theme: {
    primaryColor,
    secondaryColor,
  },
  openButton: {
    hoverColor,
    hoverBorderColor: `${primaryColor}80`,
    hoverBackgroundColor: primaryColor,
  },
  tableCell: {
    backgroundColor: primaryColor,
    color: hoverColor,
  },
  textField: {
    hoverBorderColor,
  },
  userAvatar: {
    border: userAvatarBorder,
  },
  amountBox: {
    backgroundColor: amountBoxBackground,
  },
};
