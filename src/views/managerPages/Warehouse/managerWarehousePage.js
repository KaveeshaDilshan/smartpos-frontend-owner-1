import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  Divider,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import styles from './WarehousePage.module.css';
import WarehouseItem from './components/WarehouseItem';
import ManagerLayout from '../../ManagerLayout';
import { getAllWarehouseProducts } from './redux/warehouseActions';
import AddNewWarehouseProduct from './components/AddNewWarehouseProduct';

function managerWarehousePage() {
  const dispatch = useDispatch();
  const [clickAdd, setClickAdd] = useState(false);
  const [search, setSearch] = useState('');
  // const [categorySelect, setCategorySelect] = useState('');
  // const top100Films = ['Toys', 'Biscuit'];

  const allWarehouseProducts = useSelector(
    (state) => state.managerWarehouseReducer.allWarehouseProducts
  );

  const loading = useSelector((state) => state.managerWarehouseReducer.loading);
  const warehouseID = useSelector(
    (state) => state.dashboardReducer.warehouseID
  );

  React.useEffect(() => {
    dispatch(getAllWarehouseProducts({ search, warehouseID }));
  }, [search]);

  // console.log(categorySelect);
  return (
    <>
      <ManagerLayout search={search} setSearch={setSearch} isShow={true}>
        <div className={styles.warehousepage}>
          <div className={styles.page_top}>
            <div className={styles.top}>
              {/*<div>*/}
              {/*  <Autocomplete*/}
              {/*    disablePortal*/}
              {/*    id="combo-box-demo"*/}
              {/*    options={top100Films}*/}
              {/*    onChange={(e, value) => setCategorySelect(value)}*/}
              {/*    style={{ width: 300 }}*/}
              {/*    size="small"*/}
              {/*    renderInput={(params) => (*/}
              {/*      <TextField {...params} label="Category" />*/}
              {/*    )}*/}
              {/*  />*/}
              {/*</div>*/}

              <Button
                className={styles.addNew__button}
                variant="contained"
                type="button"
                onClick={setClickAdd}
              >
                <AddIcon /> Add New
              </Button>
            </div>
            <Divider />
            <Divider />
          </div>
          <div className={styles.page_bottom}>
            <Typography
              component="h2"
              variant="h4"
              color="primary"
              gutterBottom
            >
              Warehouse Inventory
            </Typography>
            <br />
            <div className={styles.warehouse_inventory}>
              {!loading ? (
                <>
                  {allWarehouseProducts.map(
                    (item, i) =>
                      item.product && (
                        <WarehouseItem
                          key={i}
                          productId={item.product._id}
                          poto={item.product.photo}
                          productName={item.product.name}
                          unitPrice={item.product.unitPrice}
                          count={item.quantity}
                        />
                      )
                  )}
                </>
              ) : (
                <>
                  <div style={{ textAlign: 'center', marginTop: 50 }}>
                    <CircularProgress style={{ color: 'red' }} />
                  </div>
                </>
              )}
            </div>
          </div>
          <AddNewWarehouseProduct open={clickAdd} handleClose={setClickAdd} />
        </div>
      </ManagerLayout>
    </>
  );
}

export default managerWarehousePage;
