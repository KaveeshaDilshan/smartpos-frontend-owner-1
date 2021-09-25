import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Col, Row } from 'reactstrap';
import { Pagination } from '@material-ui/lab';
import { getWarehouses } from './actions';
import Layout from '../../Layout';
import AddWarehouse from './components/AddWarehouse';
import WarehouseItem from './components/WarehouseItem';

function Warehouse() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const warehouses = useSelector((state) => state.warehouseReducer.warehouses);
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(getWarehouses({ search, page }));
  }, [search, page]);
  return (
    <Layout search={search} setSearch={setSearch}>
      <Container>
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
          <Row>
            <Col className="col-lg-12 d-flex justify-content-center mt-5">
              <Pagination
                count={10}
                onChange={(e, p) => setPage(p)}
                color="primary"
              />
            </Col>
            <Col> {AddWarehouse()}</Col>
          </Row>
        </Row>
      </Container>
    </Layout>
  );
}

export default Warehouse;
