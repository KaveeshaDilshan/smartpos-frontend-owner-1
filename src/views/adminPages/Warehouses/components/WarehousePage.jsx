import React, { useEffect, useState } from 'react';
import { Container, Form, Label, FormGroup, Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import styles from './warehouse.module.css';
import { assignManager, getOneWarehouse } from '../actions';
import Layout from '../../../Layout';
import { getAllUnassignedManagers } from '../../Managers/actions';

function WarehousePage(props) {
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const [selectedManager, setSelectedManager] = useState('');
  const { warehouse } = useSelector((state) => state.warehouseReducer);
  useEffect(() => dispatch(getOneWarehouse(id)), []);

  const managers = useSelector(
    (state) => state.managerReducer.unassignedManagers
  );

  useEffect(() => dispatch(getAllUnassignedManagers()), [warehouse]);
  const managerComponent = (manager) => {
    return (
      <>
        <Row className="mt-4">
          <Col className="col-6">
            <div>
              <Avatar />
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="col-6">
            <div>
              <h4
                style={{
                  fontWeight: '700',
                  fontSize: '16px',
                }}
              >
                {manager._id}
              </h4>
              <h4
                style={{
                  fontWeight: '400',
                  fontSize: '14px',
                }}
              >
                Manager ID
              </h4>
            </div>
          </Col>
          <Col className="col-6">
            <div>
              <h4
                style={{
                  fontWeight: '700',
                  fontSize: '16px',
                }}
              >
                {manager.email}
              </h4>
              <h4
                style={{
                  fontWeight: '400',
                  fontSize: '14px',
                }}
              >
                Manager Email
              </h4>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="col-6">
            <div>
              <h4
                style={{
                  fontWeight: '700',
                  fontSize: '16px',
                }}
              >
                {manager.firstName}
              </h4>
              <h4
                style={{
                  fontWeight: '400',
                  fontSize: '14px',
                }}
              >
                First Name
              </h4>
            </div>
          </Col>
          <Col className="col-6">
            <div>
              <h4
                style={{
                  fontWeight: '700',
                  fontSize: '16px',
                }}
              >
                {manager.lastName}
              </h4>
              <h4
                style={{
                  fontWeight: '400',
                  fontSize: '14px',
                }}
              >
                Last Name
              </h4>
            </div>
          </Col>
        </Row>
      </>
    );
  };

  const assignManagerComponent = (managerArray) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(
        assignManager({
          managerId: selectedManager,
          warehouseId: warehouse._id,
        })
      );
    };
    return (
      <>
        <Row className="mt-5">
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label
                style={{
                  fontWeight: '700',
                  fontSize: '16px',
                  marginBottom: '10px',
                }}
              >
                SELECT MANAGER
              </Label>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={managerArray}
                onChange={(e, newValue) =>
                  setSelectedManager(newValue._id ? newValue._id : null)
                }
                value={`${selectedManager.firstName} ${selectedManager.lastName}`}
                getOptionLabel={(option) =>
                  `${option.firstName} ${option.lastName}`
                }
                defaultValue={`${selectedManager.firstName} ${selectedManager.lastName}`}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Movie" />
                )}
              />
              <Button type="submit">Assign Manager</Button>
            </FormGroup>
          </Form>
        </Row>
      </>
    );
  };

  return (
    <Layout>
      <Container>
        <Row>
          <Col className="col-6">
            <Row className={styles.warehouse}>
              <h4
                style={{
                  fontWeight: '700',
                  fontSize: '22px',
                }}
              >
                WAREHOUSE DETAILS
              </h4>
              <Col className="col-6">
                <div style={{ borderBottom: '3px solid #5BC67AD9' }} />
              </Col>
            </Row>
            <Row className="mt-5">
              <Col className="col-6">
                <div>
                  <h4
                    style={{
                      fontWeight: '700',
                      fontSize: '16px',
                    }}
                  >
                    {warehouse.name}
                  </h4>
                  <h4
                    style={{
                      fontWeight: '400',
                      fontSize: '14px',
                    }}
                  >
                    Warehouse Name
                  </h4>
                </div>
              </Col>
              <Col className="col-6">
                <div>
                  <h4
                    style={{
                      fontWeight: '700',
                      fontSize: '16px',
                    }}
                  >
                    {warehouse._id}
                  </h4>
                  <h4
                    style={{
                      fontWeight: '400',
                      fontSize: '14px',
                    }}
                  >
                    Warehouse ID
                  </h4>
                </div>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col className="col-6">
                <div>
                  <h4
                    style={{
                      fontWeight: '700',
                      fontSize: '16px',
                    }}
                  >
                    {warehouse.telephone}
                  </h4>
                  <h4
                    style={{
                      fontWeight: '400',
                      fontSize: '14px',
                    }}
                  >
                    Warehouse Telephone
                  </h4>
                </div>
              </Col>
              <Col className="col-6">
                <div>
                  <h4
                    style={{
                      fontWeight: '700',
                      fontSize: '16px',
                    }}
                  >
                    {warehouse.location}
                  </h4>
                  <h4
                    style={{
                      fontWeight: '400',
                      fontSize: '14px',
                    }}
                  >
                    Warehouse Location
                  </h4>
                </div>
              </Col>
            </Row>
          </Col>
          {/*<Col className="col-6">*/}
          {/*  <img src={image} alt="" />*/}
          {/*</Col>*/}
        </Row>
        <Row className="mt-5">
          <Col className="col-6">
            <Row className={styles.warehouse}>
              <h4
                style={{
                  fontWeight: '700',
                  fontSize: '22px',
                }}
              >
                MANAGER DETAILS
              </h4>
              <Col className="col-6">
                <div style={{ borderBottom: '3px solid #5BC67AD9' }} />
              </Col>
            </Row>
            {warehouse.managerId
              ? managerComponent(warehouse.managerId)
              : assignManagerComponent(managers)}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default WarehousePage;
