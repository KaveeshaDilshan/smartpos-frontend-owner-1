import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';

export default function LeaveDetailsBox({ open, handleClose, description }) {
  const clickClose = () => {
    handleClose(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        // PaperProps={{
        //   style: {
        //     minWidth: 650,
        //     padding: 0,
        //     minHeight: 500,
        //   },
        // }}
      >
        <DialogTitle>
          <Typography component="h2" variant="h4" color="primary" gutterBottom>
            Reason For Leave
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={clickClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
