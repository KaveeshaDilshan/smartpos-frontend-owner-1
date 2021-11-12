import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import {
  editSalesperson,
  getOneSalesperson,
} from '../redux/salespersonsActions';
import ManagerLayout from '../../../ManagerLayout';

function EditSalesperson(props) {
  const { id } = props.match.params;
  const dispatch = useDispatch();
  const history = useHistory();
  const salesperson = useSelector(
    (state) => state.salespersonsReducer.oneSalesperson
  );

  useEffect(() => {
    dispatch(getOneSalesperson({ id, history }));
  }, []);

  const validate = (values) => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = 'First name is required';
    }
    if (!values.lastName) {
      errors.lastName = 'Last name is required';
    }
    if (!values.telephone) {
      errors.telephone = 'Telephone is required';
    }
    if (values.telephone.length !== 10) {
      errors.telephone = 'Phone number must contained 10 digits';
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      firstName: salesperson.firstName,
      lastName: salesperson.lastName,
      telephone: salesperson.telephone,
    },
    validate,
    onSubmit: (values) => {
      const details = {
        firstName: values.firstName,
        lastName: values.lastName,
        role: salesperson.role,
        uid: salesperson.uid,
        email: salesperson.email,
        telephone: values.telephone,
        warehouseId: salesperson.warehouse,
      };
      dispatch(
        editSalesperson({
          id,
          details,
        })
      );
    },
    enableReinitialize: true,
  });

  return (
    <>
      <ManagerLayout>
        <Container style={{ marginTop: 20 }}>
          <Form onSubmit={formik.handleSubmit}>
            <Row form className="mb-2">
              <Row>
                <Col className="col-6">
                  <FormGroup>
                    <Label>First Name</Label>
                    <Input
                      name="firstName"
                      id="firstName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstName}
                    />
                    {formik.errors.firstName && formik.touched.firstName && (
                      <p className="input-warning">{formik.errors.firstName}</p>
                    )}
                  </FormGroup>
                </Col>
                <Col className="col-6">
                  <FormGroup>
                    <Label>Last Name</Label>
                    <Input
                      name="lastName"
                      id="lastName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastName}
                    />
                    {formik.errors.lastName && formik.touched.lastName && (
                      <p className="input-warning">{formik.errors.lastName}</p>
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="col-6">
                  <FormGroup>
                    <Label>Telephone</Label>
                    <Input
                      name="telephone"
                      id="telephone"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.telephone}
                    />
                    {formik.errors.telephone && formik.touched.telephone && (
                      <p className="input-warning">{formik.errors.telephone}</p>
                    )}
                  </FormGroup>
                </Col>
                <Col className="col-6">
                  <FormGroup>
                    <Label>EMAIL</Label>
                    <Input
                      name="email"
                      id="email"
                      disabled={true}
                      value={salesperson.email}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Row>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="mt-3"
            >
              SAVE
            </Button>
          </Form>
        </Container>
      </ManagerLayout>
    </>
  );
}

export default EditSalesperson;
