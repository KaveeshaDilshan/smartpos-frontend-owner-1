import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { Pagination } from '@material-ui/lab';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Layout from '../../Layout';
import { getAllSalesperson } from './actions';
import SalespersonItem from './components/SalespersonItem';
import { getWarehouses } from '../Warehouses/actions';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function SalespersonPage() {
  const dispatch = useDispatch();
  const { salespersons, totalSalespersons } = useSelector(
    (state) => state.adminSalespersonReducer
  );
  const [page, setPage] = useState(1);
  const [filter, setFilter] = React.useState('all');
  const [warehouse, setWarehouse] = useState('');
  useEffect(() => {
    dispatch(getAllSalesperson({ page, filter, warehouse }));
  }, [page, filter, warehouse]);
  const classes = useStyles();

  const handleChange = (event) => {
    setFilter(event.target.value);
  };
  const handleWarehouse = (event) => {
    setWarehouse(event.target.value);
  };
  const warehouses = useSelector((state) => state.warehouseReducer.warehouses);
  useEffect(() => dispatch(getWarehouses({ search: '' })), []);
  const number = Math.ceil(totalSalespersons / 9);
  return (
    <>
      <Layout>
        <Container>
          <Row>
            <Col className="col-4 d-flex align-items-center justify-content-center">
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Filter By</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filter}
                  onChange={handleChange}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="warehouse">Warehouse</MenuItem>
                </Select>
              </FormControl>
            </Col>
            {filter === 'warehouse' && (
              <Col className="col-2 d-flex align-items-center justify-content-center">
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">
                    Select Warehouse
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={warehouse}
                    onChange={handleWarehouse}
                  >
                    {warehouses.map((w) => {
                      return (
                        <MenuItem value={w._id} key={w._id}>
                          {w.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Col>
            )}
            <Col className="col-lg-4 d-flex justify-content-center align-items-center">
              <Pagination
                count={number}
                onChange={(e, p) => setPage(p)}
                color="primary"
              />
            </Col>
            <Col className="d-flex align-items-center justify-content-center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="mt-3"
              >
                VIEW LEADERBOARD
              </Button>
            </Col>
          </Row>
          <Row>
            {salespersons.map((salesperson) => {
              return (
                <Col
                  key={salesperson._id}
                  className="col-md-6 col-sm-12 col-lg-4"
                >
                  <SalespersonItem
                    id={salesperson._id}
                    firstName={salesperson.firstName}
                    lastName={salesperson?.lastName}
                    email={salesperson.email}
                    warehouse={salesperson?.warehouseId}
                    photo={salesperson?.photo}
                  />
                </Col>
              );
            })}
            <Row />
          </Row>
        </Container>
      </Layout>
    </>
  );
}

export default SalespersonPage;
