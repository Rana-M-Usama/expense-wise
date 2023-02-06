import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
} from "@mui/material";
import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (isAllow: boolean) => void;
};

function ConfirmationModal({ isOpen, onClose, onSubmit }: Props) {
  const handleClose = (confirm: boolean) => {
    onClose();
    onSubmit(confirm);
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={() => handleClose(false)}
        aria-labelledby="draggable-dialog-title"
      >
        <Paper style={{ width: 500 }}>
          <DialogTitle id="confirmation-dialog-title">Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText id="confirmation-dialog-description">
              Are you sure you want to proceed?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose(false)} color="primary">
              No
            </Button>
            <Button onClick={() => handleClose(true)} color="primary">
              Yes
            </Button>
          </DialogActions>
        </Paper>
      </Dialog>
    </div>
  );
}

export default ConfirmationModal;
