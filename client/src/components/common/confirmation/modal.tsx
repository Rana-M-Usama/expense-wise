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
  loading: boolean;
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (isAllow: boolean) => void;
};

const ConfirmationModal = ({ loading, isOpen, onClose, onSubmit }: Props) => {
  const handleClose = (confirm: boolean) => {
    if (confirm) onSubmit(confirm);
    else onClose();
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
            <Button
              onClick={() => handleClose(false)}
              disabled={loading}
              color="primary"
            >
              No
            </Button>
            <Button
              color="primary"
              onClick={() => handleClose(true)}
              disabled={loading}
            >
              Yes
            </Button>
          </DialogActions>
        </Paper>
      </Dialog>
    </div>
  );
};

export default ConfirmationModal;
