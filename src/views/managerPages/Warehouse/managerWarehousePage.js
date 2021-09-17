import React from 'react';
import { Button, Divider, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useHistory } from 'react-router-dom';
import styles from './WarehousePage.module.css';
import WarehouseItem from './components/WarehouseItem';
import ManagerLayout from '../../ManagerLayout';

function managerWarehousePage() {
  const top100Films = [{ title: 'Toys' }, { title: 'Biscuit' }];
  const history = useHistory();
  return (
    <>
      <ManagerLayout>
        <div className={styles.warehousepage}>
          <div className={styles.page_top}>
            <div className={styles.top}>
              <Autocomplete
                id="combo-box-demo"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                style={{ width: 300 }}
                size="small"
                renderInput={(params) => (
                  <TextField {...params} label="Category" variant="outlined" />
                )}
              />
              <Button
                className={styles.addNew__button}
                variant="contained"
                type="button"
                onClick={() => history.push('/manager/products/addnew')}
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
              variant="h6"
              color="primary"
              gutterBottom
            >
              Warehouse Inventory
            </Typography>
            <br />
            <div className={styles.warehouse_inventory}>
              <WarehouseItem
                poto="https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product.png"
                productName="Maari Biscuit"
                unitPrice={100.0}
                count={300}
              />
              <WarehouseItem
                poto="https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product.png"
                productName="Maari Biscuit"
                unitPrice={100.0}
                count={300}
              />
              <WarehouseItem
                poto="https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product.png"
                productName="Maari Biscuit"
                unitPrice={100.0}
                count={300}
              />
              <WarehouseItem
                poto="https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product.png"
                productName="Maari Biscuit"
                unitPrice={100.0}
                count={300}
              />
            </div>
          </div>
        </div>
      </ManagerLayout>
    </>
  );
}

export default managerWarehousePage;
