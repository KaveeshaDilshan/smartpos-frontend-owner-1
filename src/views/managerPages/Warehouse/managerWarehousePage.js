import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  Divider,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
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

  const allWarehouseProducts = useSelector(
    (state) => state.managerWarehouseReducer.allWarehouseProducts
  );

  const loading = useSelector((state) => state.managerWarehouseReducer.loading);
  const loggedManager = useSelector((state) => state.loginReducer.user);

  React.useEffect(() => {
    dispatch(
      getAllWarehouseProducts({
        search,
        warehouseID: loggedManager.warehouseId,
      })
    );
  }, [search]);

  return (
    <>
      <ManagerLayout search={search} setSearch={setSearch} isShow={true}>
        <div className={styles.warehousePage}>
          <div>
            <div className={styles.top}>
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                Warehouse Inventory
              </Typography>
              <Button
                className={styles.addNew__button}
                variant="contained"
                type="button"
                onClick={() => setClickAdd(true)}
              >
                <AddIcon /> Add New
              </Button>
            </div>
            <Divider />
            <Divider className="mb-3" />
          </div>
          <div className={styles.page_bottom}>
            <div>
              {!loading ? (
                <>
                  {allWarehouseProducts &&
                    allWarehouseProducts.map(
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
                  {allWarehouseProducts &&
                    allWarehouseProducts.length === 0 && (
                      <h6>No Any Products In The Warehouse</h6>
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
