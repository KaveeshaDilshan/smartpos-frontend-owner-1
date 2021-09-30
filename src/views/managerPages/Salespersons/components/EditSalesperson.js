import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import Button from '@material-ui/core/Button';
import {
  editSalesperson,
  getOneSalesperson,
} from '../redux/salespersonsActions';
import ManagerLayout from '../../../ManagerLayout';

function EditSalesperson(props) {
  const { id } = props.match.params;
  const dispatch = useDispatch();
  const salesperson = useSelector(
    (state) => state.salespersonsReducer.oneSalesperson
  );

  useEffect(() => {
    dispatch(getOneSalesperson(id));
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
    if (!values.email) {
      errors.email = 'Email is Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    }
    if (!values.rePassword) {
      errors.rePassword = 'Re-password is required';
    } else if (values.password !== values.rePassword) {
      errors.rePassword = 'Passwords should match';
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      firstName: salesperson.firstName,
      lastName: salesperson.lastName,
      email: salesperson.email,
      telephone: salesperson.telephone,
      password: '',
      rePassword: '',
    },
    validate,
    onSubmit: (values) => {
      dispatch(
        editSalesperson({
          id,
          details: values,
        })
      );
    },
    enableReinitialize: true,
  });

  return (
    <>
      <ManagerLayout>
        <Container
          style={{
            height: '87vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
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
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.errors.email && formik.touched.email && (
                      <p className="input-warning">{formik.errors.email}</p>
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="col-6">
                  <FormGroup>
                    <Label>PASSWORD</Label>
                    <Input
                      name="password"
                      id="password"
                      type="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    {formik.errors.password && formik.touched.password && (
                      <p className="input-warning">{formik.errors.password}</p>
                    )}
                  </FormGroup>
                </Col>
                <Col className="col-6">
                  <FormGroup>
                    <Label>RE-PASSWORD</Label>
                    <Input
                      name="rePassword"
                      id="rePassword"
                      type="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.rePassword}
                    />
                    {formik.errors.rePassword && formik.touched.rePassword && (
                      <p className="input-warning">
                        {formik.errors.rePassword}
                      </p>
                    )}
                  </FormGroup>
                </Col>
              </Row>
            </Row>
            <Button type="submit" variant="contained">
              SAVE
            </Button>
          </Form>
        </Container>
      </ManagerLayout>
    </>
  );
}

export default EditSalesperson;
