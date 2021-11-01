import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../Products/redux/productActions';
import {
  addProductToWarehouse,
  getAllWarehouseProducts,
} from '../redux/warehouseActions';

export default function AddNewWarehouseProduct({ open, handleClose }) {
  const dispatch = useDispatch();
  const [productSelect, setProductSelect] = useState({});
  const allProducts = useSelector((state) => state.productReducer.allProducts);
  const warehouseID = useSelector(
    (state) => state.dashboardReducer.warehouseID
  );
  React.useEffect(() => {
    dispatch(getAllProducts({ search: '', category: '' }));
  }, []);
  const handleAddButton = () => {
    dispatch(
      addProductToWarehouse({
        warehouseID,
        details: {
          product: productSelect._id,
          quantity: 0,
        },
      })
    );
    dispatch(getAllWarehouseProducts({ search: '', warehouseID }));
    dispatch(getAllWarehouseProducts({ search: '', warehouseID }));
  };

  const clickCancel = () => {
    handleClose(false);
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        PaperProps={{
          style: {
            padding: 0,
            minHeight: 400,
          },
        }}
      >
        <DialogTitle>
          <div>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              Add Product To Warehouse
            </Typography>
          </div>
        </DialogTitle>
        <DialogContent>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={allProducts}
            getOptionLabel={(option) => option.name}
            onChange={(e, value) => setProductSelect({ ...value })}
            style={{ width: 300 }}
            size="small"
            renderInput={(params) => <TextField {...params} label="Product" />}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={clickCancel} color="primary">
            Cancel
          </Button>
          <Button autoFocus onClick={handleAddButton} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
