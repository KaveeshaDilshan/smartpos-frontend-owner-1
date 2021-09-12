import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Col, Row } from 'reactstrap';
import { getWarehouses } from './actions';
import WarehouseItem from './components/WarehouseItem';
import Layout from '../Layout';

function Warehouse() {
  const dispatch = useDispatch();
  const [query] = useState('');
  useEffect(() => {
    dispatch(getWarehouses(query));
  }, []);
  const warehouses = useSelector((state) => state.warehouseReducer.warehouses);
  const [search, setSearch] = useState('');
  return (
    <Layout search={search} setSearch={setSearch}>
      <Container>
        <Row>
          {warehouses.map((warehouse) => {
            return (
              <Col key={warehouse._id} className="col-md-6 col-sm-12 col-lg-4">
                {search}
                <WarehouseItem
                  id={warehouse._id}
                  name={warehouse.name}
                  location={warehouse?.location}
                  managerName={warehouse.managerId}
                  telephone={warehouse?.telephone}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </Layout>
  );
}

export default Warehouse;
