import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import { useHistory } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 180,
    backgroundColor: 'rgb(232, 255, 230)',
    // maxHeight: 300,
    // marginTop: '5px',
  },
  name: {
    fontSize: 15,
    fontWeight: 550,
  },
  categoryName: {
    fontSize: 14,
  },
  // media: {
  //   transform: 'scale(0.7)',
  //   marginLeft: 1,
  //   marginRight: 1,
  //   marginTop: -45,
  //   marginBottom: -40,
  // },
  // price: {
  //   marginTop: -30,
  // },
  priceTag: {
    marginTop: -60,
    backgroundColor: 'rgb(211, 216, 247)',
    color: 'rgb(33, 83, 190)',
    fontSize: 12,
  },
  button: {
    marginTop: -30,
    backgroundColor: 'rgb(240, 236, 236)',
    fontSize: 10,
    '&:hover': {
      backgroundColor: 'rgb(161, 161, 161)',
      color: 'white',
    },
  },
  edit: {
    marginTop: -30,
    padding: 2,
    '&:hover': {
      backgroundColor: 'rgb(161, 161, 161)',
      color: 'white',
      borderRadius: 5,
      cursor: 'pointer',
    },
  },
  delete: {
    marginTop: -30,
    padding: 2,
    '&:hover': {
      backgroundColor: 'rgb(250, 134, 114);',
      color: 'white',
      borderRadius: 5,
      cursor: 'pointer',
    },
  },
});

export default function ProductItem({
  productId,
  name,
  categoryName,
  unitPrice,
  photoURL,
  description,
}) {
  const classes = useStyles();
  const history = useHistory();

  const [confirmBoxOn, setconfirmBoxOn] = useState(false);
  const [deleteConfirm, setConfirm] = useState(false);
  const title = 'Delete';
  const body = 'Are you sure? Do you want to delete this product';
  const option1 = 'Cancel';
  const option2 = 'Yes';

  const [detailsBoxOn, setDetailsBoxOn] = useState(false);

  useEffect(() => {
    if (deleteConfirm === true) {
      setConfirm(false);
    }
  }, [deleteConfirm]);

  return (
    <>
      <Card className={classes.root} variant="elevation">
        <CardMedia
          component="img"
          alt="Product Image"
          image={photoURL}
          src={photoURL}
          title="Product Image"
          className={classes.media}
        />
        <Divider />
        <Divider />
        <CardContent>
          <Typography className={classes.name}>{name}</Typography>
          <Typography
            className={classes.categoryName}
            color="textSecondary"
            gutterBottom
          >
            {categoryName}
          </Typography>
        </CardContent>
        <CardContent>
          <Chip
            size="small"
            label={`RS ${unitPrice}`}
            className={classes.priceTag}
          />
        </CardContent>
        <CardActions>
          <Button
            className={classes.button}
            size="small"
            onClick={setDetailsBoxOn}
          >
            Details
          </Button>
          <EditIcon
            className={classes.edit}
            color="action"
            onClick={() =>
              history.push(`/manager/products/getOne/${productId}`)
            }
          />
          <DeleteIcon
            className={classes.delete}
            color="action"
            onClick={setconfirmBoxOn}
          />
        </CardActions>
      </Card>
      <ConfirmationBox
        open={confirmBoxOn}
        handleClose={setconfirmBoxOn}
        title={title}
        description={body}
        option1={option1}
        option2={option2}
        setState={setConfirm}
      />
      <Dialog open={detailsBoxOn} onClose={() => setDetailsBoxOn(false)}>
        <DialogTitle>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Products Details
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => setDetailsBoxOn(false)}
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
