import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Col, Row } from 'reactstrap';
import { getWarehouses } from './actions';
import WarehouseItem from './components/WarehouseItem';

function Warehouse() {
  const dispatch = useDispatch();
  const [query] = useState('');
  useEffect(() => {
    dispatch(getWarehouses(query));
  }, []);
  const warehouses = useSelector((state) => state.warehouseReducer.warehouses);
  return (
    <>
      <Container>
        <Row>
          {warehouses.map((warehouse) => {
            return (
              <Col key={warehouse._id} className="col-3">
                <WarehouseItem
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
    </>
  );
}

export default Warehouse;
