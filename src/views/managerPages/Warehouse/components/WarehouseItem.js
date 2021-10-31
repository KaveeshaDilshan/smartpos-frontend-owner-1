import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  changeWarehouseProductQuantity,
  deleteWarehouseProduct,
} from '../redux/warehouseActions';
import ConfirmationBox from '../../common/ConfirmationBox';

const useStyles = makeStyles(() => ({
  card: {
    boxSizing: 'border-box',
    width: '100%',
    marginBottom: 10,
    padding: 10,
    background: '#ffff',
    borderRadius: 5,
    boxShadow: '0px 0px 5px gray',
    '&:hover': {
      boxShadow: '0px 0px 5px 0px black',
      background: '#f8f7f7',
    },
  },
  saveIcon: {
    marginLeft: 10,
    fontSize: 30,
    '&:hover': {
      cursor: 'pointer',
      color: 'rgb(78, 90, 247)',
    },
  },
  deleteIcon: {
    marginLeft: 10,
    fontSize: 30,
    '&:hover': {
      cursor: 'pointer',
      color: 'rgb(78, 90, 247)',
    },
  },
  media: {
    height: 75,
    width: 75,
    display: 'inline-block',
  },
}));

function WarehouseItem({ productId, poto, productName, unitPrice, count }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(count);
  const warehouseID = useSelector(
    (state) => state.dashboardReducer.warehouseID
  );
  const [confirmBoxOn, setConfirmBox] = useState(false);
  const [deleteConfirm, setConfirm] = useState(false);
  const title = 'Delete';
  const body =
    'Are you sure? Do you want to remove this product from warehouse?';
  const option1 = 'Cancel';
  const option2 = 'Yes';
  useEffect(() => {
    if (deleteConfirm === true) {
      dispatch(deleteWarehouseProduct({ productId, warehouseID }));
      setConfirm(false);
    }
  }, [deleteConfirm]);
  const handleSave = () => {
    dispatch(
      changeWarehouseProductQuantity({
        warehouseID,
        details: {
          product: productId,
          quantity: parseInt(quantity, 10),
        },
      })
    );
  };

  if (!productId || !productName) {
    return null;
  }
  return (
    <>
      <Card className={classes.card}>
        <div style={{ display: 'flex' }}>
          <div>
            <CardMedia
              id="photo"
              component="img"
              alt="Product Image"
              src={poto}
              title="Product Image"
              className={classes.media}
            />
          </div>
          <div
            style={{
              marginLeft: 35,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: 20,
                fontWeight: 450,
                width: '50%',
              }}
            >
              <div id="product_name">{productName}</div>
              <div id="unitPrice">Rs {unitPrice}</div>
            </div>

            <div
              style={{
                marginRight: 10,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <TextField
                id="quantity"
                type="number"
                defaultValue={count}
                variant="outlined"
                size="small"
                onChange={(e) => setQuantity(e.target.value)}
              />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <SaveIcon className={classes.saveIcon} onClick={handleSave} />
                <DeleteIcon
                  className={classes.deleteIcon}
                  color="action"
                  onClick={setConfirmBox}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
      <ConfirmationBox
        open={confirmBoxOn}
        handleClose={setConfirmBox}
        title={title}
        description={body}
        option1={option1}
        option2={option2}
        setState={setConfirm}
      />
    </>
  );
}

export default WarehouseItem;
