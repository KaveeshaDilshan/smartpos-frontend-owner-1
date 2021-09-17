import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ConfirmationBox({
  open,
  handleClose,
  title,
  description,
  option1,
  option2,
  setState,
}) {
  const clickOptionOne = () => {
    setState(false);
    handleClose(false);
  };

  const clickOptionTwo = () => {
    setState(true);
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
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={clickOptionOne} color="primary">
            {option1}
          </Button>
          <Button onClick={clickOptionTwo} color="primary">
            {option2}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
