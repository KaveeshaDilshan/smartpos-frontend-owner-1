import { Col, Row, Table } from 'reactstrap';
import {
  CircularProgress,
  Divider,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import { Autocomplete } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Moment from 'moment';
import { getAllWarehouseProducts } from '../../Warehouse/redux/warehouseActions';
import {
  addDailyProduct,
  getSalespersonDailyProducts,
} from '../redux/salespersonsActions';

const useStyles = makeStyles((theme) => ({
  SaveIcon: {
    marginLeft: 10,
    fontSize: 30,
    '&:hover': {
      color: 'rgb(78, 90, 247)',
      cursor: 'pointer',
    },
  },
  paper: {
    padding: theme.spacing(1),
    margin: 0,
  },
}));

const DailyProducts = ({ id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedDate, handleDateChange] = useState(Moment());
  const [selectedProduct, handleProductSelect] = useState({});
  // const [counts, setCounts] = useState({});
  const allWarehouseProducts = useSelector(
    (state) => state.managerWarehouseReducer.allWarehouseProducts
  );
  const warehouseID = useSelector(
    (state) => state.dashboardReducer.warehouseID
  );
  const dailyProducts = useSelector(
    (state) => state.salespersonsReducer.oneSalespersonDailyProducts
  );
  const loading = useSelector(
    (state) => state.salespersonsReducer.dailyProductsLoading
  );
  React.useEffect(() => {
    dispatch(getAllWarehouseProducts({ search: '', warehouseID }));
    dispatch(
      getSalespersonDailyProducts({
        id,
        date: Moment.utc(selectedDate),
      })
    );
  }, [selectedDate, id]);

  const [addedDailyProducts, setAddedDailyProducts] = useState(dailyProducts);

  React.useEffect(() => {
    setAddedDailyProducts(dailyProducts);
  }, [dailyProducts, id]);

  function findArrayElementById(array, productId) {
    return array.find((element) => {
      return element.product._id === productId;
    });
  }

  const handleProductAdd = () => {
    if (selectedProduct._id) {
      if (
        !findArrayElementById(addedDailyProducts, selectedProduct.product._id)
      ) {
        addedDailyProducts.push({
          product: selectedProduct.product,
          quantity: 0,
          sales: 0,
        });
        setAddedDailyProducts([...addedDailyProducts]);
      }
    } else {
      toast.error('Select a Product');
    }
  };
  const handleSaveClick = () => {
    dispatch(
      addDailyProduct({
        warehouseId: warehouseID,
        details: {
          salesperson: id,
          createdAt: Moment.utc(selectedDate),
          dailyProducts: addedDailyProducts,
        },
      })
    );
  };
  const setQuantityChanges = (index, quantity) => {
    addedDailyProducts[index].quantity = quantity;
  };
  return (
    <>
      <Col className="col-6">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            DAILY PRODUCTS
          </Typography>
        </div>
        <Paper className={classes.paper}>
          <Row className="mt-3">
            <div>
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Sold</th>
                    <th>Remains</th>
                  </tr>
                </thead>
                {!loading && (
                  <tbody>
                    {addedDailyProducts &&
                      addedDailyProducts.map((product, index) => (
                        <tr key={product._id}>
                          <td>
                            {product.product
                              ? product.product.name
                              : 'products name'}
                          </td>
                          <td>
                            <div
                              style={{
                                marginRight: 10,
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              <TextField
                                style={{
                                  width: 100,
                                }}
                                disabled={
                                  Moment(selectedDate) <
                                  Moment().subtract(1, 'days')
                                }
                                type="number"
                                id="outlined-size-small"
                                defaultValue={
                                  product.quantity ? product.quantity : 0
                                }
                                variant="outlined"
                                size="small"
                                onChange={(e) =>
                                  setQuantityChanges(index, e.target.value)
                                }
                              />
                            </div>
                          </td>
                          <td>
                            <TextField
                              style={{
                                width: 100,
                              }}
                              disabled
                              type="number"
                              id="outlined-size-small"
                              defaultValue={product.sales}
                              variant="outlined"
                              size="small"
                            />
                          </td>
                          <td>
                            <TextField
                              style={{
                                width: 100,
                              }}
                              disabled
                              type="number"
                              id="outlined-size-small"
                              defaultValue={
                                product.quantity
                                  ? product.quantity - product.sales
                                  : 0
                              }
                              variant="outlined"
                              size="small"
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                )}
                {loading && (
                  <>
                    <div style={{ textAlign: 'center', marginTop: 50 }}>
                      <CircularProgress style={{ color: 'red' }} />
                    </div>
                  </>
                )}
              </Table>
            </div>
          </Row>
        </Paper>
      </Col>
      <Col className="col-6">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ADD DAILY PRODUCTS
            </Typography>
          </div>
          <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                // margin="normal"
                id="date-picker-dialog"
                // label="Date picker dialog"
                format="yyyy/MM/dd/"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
        </div>
        <Paper className={classes.paper}>
          <Row className="mt-3">
            <div>
              <Autocomplete
                id="tags-standard"
                options={allWarehouseProducts}
                getOptionLabel={(option) => option.product.name}
                onChange={(e, value) => handleProductSelect({ ...value })}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Select a Product"
                    placeholder="Product"
                  />
                )}
              />
            </div>
          </Row>
          <Row className="mt-3" style={{ textAlign: 'end' }}>
            <div>
              <Button
                variant="contained"
                size="small"
                onClick={handleProductAdd}
                style={{ marginRight: 5 }}
              >
                ADD
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={handleSaveClick}
              >
                SAVE
              </Button>
            </div>
          </Row>
          <Divider style={{ height: 2, marginTop: 10 }} />
          {/*<Row className="mt-3" style={{ textAlign: 'end' }}>*/}
          {/*  <div*/}
          {/*    style={{*/}
          {/*      display: 'flex',*/}
          {/*      alignItems: 'center',*/}
          {/*      justifyContent: 'space-between',*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    <h5>Remains Add to Warehouse:</h5>*/}
          {/*    <Button variant="contained" size="small">*/}
          {/*      Add*/}
          {/*    </Button>*/}
          {/*  </div>*/}
          {/*</Row>*/}
        </Paper>
      </Col>
    </>
  );
};
export default DailyProducts;
