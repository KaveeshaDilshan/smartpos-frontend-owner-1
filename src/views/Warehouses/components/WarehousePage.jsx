import React, { useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { getOneWarehouse } from '../actions';
import Layout from '../../Layout';

function WarehousePage(props) {
  const dispatch = useDispatch();
  const { id } = props.match.params;
  useEffect(() => dispatch(getOneWarehouse(id)), []);
  const { warehouse } = useSelector((state) => state.warehouseReducer);
  return (
    <Layout>
      <Container>
        <Row>
          <Col className="col-lg-6">
            <Col className="col-lg-6">
              <Paper className="mt-5" variant="outlined">
                <Typography>Name - {warehouse.name}</Typography>
                <Typography>Location - {warehouse.name}</Typography>
                <Typography>Telephone - {warehouse.name}</Typography>
                <Typography>Name - {warehouse.name}</Typography>
              </Paper>
            </Col>
            <Col className="col-lg-6">
              <div>Manager details</div>
            </Col>
          </Col>
          <Col className="col-lg-6">
            <div>sales person details</div>
          </Col>
        </Row>
        <Row>
          <Col className="col-lg-12">
            <div>Inventory detaiils</div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default WarehousePage;
