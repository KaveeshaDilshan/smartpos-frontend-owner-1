import React, { useEffect, useState } from 'react';
import { Container, Form, Label, FormGroup, Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import styles from './warehouse.module.css';
import { assignManager, getOneWarehouse, removeManager } from '../actions';
import Layout from '../../../Layout';
import { getAllUnassignedManagers } from '../../Managers/actions';
import Loading from '../../../../components/common/Loading';
import WarehouseAnalytics from './WarehouseAnalytics';
import { logoutUser } from '../../../login/redux/loginActions';
import ConfirmationBox from '../../../managerPages/common/ConfirmationBox';

function WarehousePage(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = props.match.params;
  const managers = useSelector(
    (state) => state.managerReducer.unassignedManagers
  );
  const { warehouseAnalytics } = useSelector((state) => state.warehouseReducer);
  const { warehouse, loading } = useSelector((state) => state.warehouseReducer);

  useEffect(() => dispatch(getOneWarehouse(id)), []);
  useEffect(() => {
    dispatch(getAllUnassignedManagers());
  }, [warehouse, warehouseAnalytics]);
  const [selectedManager, setSelectedManager] = useState('');
  const [open, setOpen] = React.useState(false);
  const [confirmBoxOn, setConfirmBox] = useState(false);
  const [deleteConfirm, setConfirm] = useState(false);
  const title = 'Remove';
  const body = 'Do you want to remove the manager?';
  const option1 = 'Cancel';
  const option2 = 'Yes';
  useEffect(() => {
    if (deleteConfirm === true) {
      dispatch(removeManager(id));
      setConfirm(false);
    }
  }, [deleteConfirm]);

  const managerComponent = (manager) => {
    return (
      <>
        <Row className="mt-4">
          <Col className="col-6">
            {manager && (
              <div className="d-flex align-items-center">
                <div>
                  <button
                    type="button"
                    style={{ backgroundColor: 'transparent', border: 'none' }}
                    onClick={() => setConfirmBox(!confirmBoxOn)}
                  >
                    <HighlightOffIcon scale={2} />
                  </button>
                </div>
                <h6 style={{ color: 'red', paddingTop: '10px' }}>
                  Remove the manager
                </h6>
              </div>
            )}
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
      if (selectedManager) {
        dispatch(
          assignManager({
            managerId: selectedManager,
            warehouseId: warehouse._id,
          })
        );
      } else {
        toast.error('No Manager Is Selected');
      }
    };
    return (
      <>
        <Row className="mt-5">
          <Form onSubmit={handleSubmit}>
            {managerArray.length > 0 ? (
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
                  getOptionLabel={(option) => {
                    return `${option.firstName} ${option.lastName}`;
                  }}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="MANAGER NAME" />
                  )}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="mt-3"
                >
                  Assign A Manager
                </Button>
              </FormGroup>
            ) : (
              <>
                <p>
                  No Unassigned Managers Available. PLEASE ADD NEW MANAGER FIRST
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="mt-3"
                    onClick={() => history.push('/admin/managers/addManager')}
                  >
                    Add New Manager
                  </Button>
                </p>
              </>
            )}
          </Form>
        </Row>
      </>
    );
  };

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
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
            <Col className="col-6">
              <Row className={styles.warehouse}>
                <h4
                  style={{
                    fontWeight: '700',
                    fontSize: '22px',
                  }}
                >
                  PRODUCTS
                </h4>
                <Col className="col-6">
                  <div style={{ borderBottom: '3px solid #5BC67AD9' }} />
                </Col>
              </Row>
              <div
                style={{ maxHeight: 200, overflow: 'auto' }}
                className="mt-5"
              >
                {warehouse.products &&
                  warehouse.products.map((p) => (
                    <div
                      className="d-flex justify-content-between"
                      style={{
                        paddingTop: '5px',
                        paddingRight: '3px',
                        paddingBottom: '5px',
                      }}
                    >
                      <div className="d-flex justify-content-around">
                        <div style={{ marginLeft: 20 }}>
                          <img
                            src={p.product.photo}
                            alt=""
                            width="50px"
                            height="auto"
                          />
                        </div>
                        <div>
                          <span>{p.product.name}</span>
                        </div>
                      </div>
                      <div>
                        {/*<Button*/}
                        {/*  size="small"*/}
                        {/*  type="submit"*/}
                        {/*  color="primary"*/}
                        {/*  variant="outlined"*/}
                        {/*  style={{ marginBottom: 0 }}*/}
                        {/*  onClick={() => setOpen(open)}*/}
                        {/*>*/}
                        {/*  Show Details*/}
                        {/*</Button>*/}
                        <h5>x {p.quantity}</h5>
                      </div>
                    </div>
                  ))}
                <ConfirmationBox
                  open={confirmBoxOn}
                  handleClose={setConfirmBox}
                  title={title}
                  description={body}
                  option1={option1}
                  option2={option2}
                  setState={setConfirm}
                />
              </div>
            </Col>
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
            <Col className="col-6">
              <WarehouseAnalytics id={warehouse._id} />
            </Col>
          </Row>
        </Container>
      )}
    </Layout>
  );
}

export default WarehousePage;
