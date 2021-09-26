import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { Pagination } from '@material-ui/lab';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Layout from '../../Layout';
import { getAllManagers } from './actions';
import ManagerItem from './components/ManagerItem';
import { getWarehouses } from '../Warehouses/actions';
import Loading from '../../../components/common/Loading';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function ManagerPage() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { managers, totalManagers, loading } = useSelector(
    (state) => state.managerReducer
  );
  const warehouses = useSelector((state) => state.warehouseReducer.warehouses);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = React.useState('all');
  const [warehouse, setWarehouse] = useState('');
  useEffect(() => dispatch(getWarehouses({ search: '' })), []);
  const handleWarehouse = (event) => {
    setWarehouse(event.target.value);
  };
  const handleChange = (event) => {
    setFilter(event.target.value);
  };
  const history = useHistory();
  useEffect(() => {
    dispatch(getAllManagers({ page, filter, warehouse }));
  }, [page, filter, warehouses, warehouse]);

  const number = Math.ceil(totalManagers / 9);
  return (
    <>
      <Layout>
        <Container>
          <Row>
            <Col className="col-3 d-flex align-items-center justify-content-center">
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
              {filter === 'warehouse' && (
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">
                    Warehouse
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
              )}
            </Col>
            <Col className="col-6 d-flex justify-content-center align-items-center">
              <Pagination
                count={number}
                onChange={(e, p) => setPage(p)}
                color="primary"
              />
            </Col>
            <Col className="col-2">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="mt-3"
                onClick={() => history.push('/admin/managers/addManager')}
              >
                Add New Manager
              </Button>
            </Col>
          </Row>

          <Row>
            {loading ? (
              <Loading />
            ) : (
              managers.map((manager) => {
                return (
                  <Col
                    key={manager._id}
                    className="col-md-6 col-sm-12 col-lg-4"
                  >
                    <ManagerItem
                      id={manager._id}
                      firstName={manager.firstName}
                      lastName={manager?.lastName}
                      email={manager.email}
                      warehouse={manager?.warehouseId}
                      photo={manager?.photo}
                    />
                  </Col>
                );
              })
            )}
          </Row>
        </Container>
      </Layout>
    </>
  );
}

export default ManagerPage;
