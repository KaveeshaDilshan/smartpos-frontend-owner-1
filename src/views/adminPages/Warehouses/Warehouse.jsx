import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Col, Row } from 'reactstrap';
import { Pagination } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import { getWarehouses } from './actions';
import Layout from '../../Layout';
import AddWarehouse from './components/AddWarehouse';
import WarehouseItem from './components/WarehouseItem';

function Warehouse() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const { warehouses, total } = useSelector((state) => state.warehouseReducer);
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(getWarehouses({ search, page }));
  }, [search, page]);
  const number = Math.ceil(total / 9);
  return (
    <Layout>
      <Container>
        <Row>
          <Col className="col-4 d-flex align-items-center justify-content-center">
            <TextField
              defaultValue={search}
              label="Search By Name"
              onChange={(e, value) => setSearch(e.target.value)}
            />
          </Col>
          <Col className="col-lg-4 d-flex align-items-center justify-content-center">
            <Pagination
              count={number}
              onChange={(e, p) => setPage(p)}
              color="primary"
            />
          </Col>
          {AddWarehouse()}
        </Row>
        <Row>
          {warehouses.map((warehouse) => {
            return (
              <Col key={warehouse._id} className="col-md-6 col-sm-12 col-lg-4">
                <WarehouseItem
                  id={warehouse._id}
                  name={warehouse.name}
                  district={warehouse?.district}
                  managerName={warehouse.managerId}
                  telephone={warehouse?.telephone}
                />
              </Col>
            );
          })}
          <Row />
        </Row>
      </Container>
    </Layout>
  );
}

export default Warehouse;
