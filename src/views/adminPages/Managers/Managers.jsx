import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row, Form, FormGroup, Label, Input } from 'reactstrap';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import { addManager, getAllManagers } from './actions';
import Layout from '../../Layout';
//import { passwordRegex } from '../../util/regex';

function Managers() {
  const dispatch = useDispatch();
  useEffect(() => dispatch(getAllManagers()), []);
  useSelector((state) => state.managerReducer);
  const validate = (values) => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = 'First name is required';
    }
    if (!values.lastName) {
      errors.lastName = 'Last name is required';
    }
    if (!values.email) {
      errors.email = 'Email is Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    // if (!values.password) {
    //   errors.password = 'Password is required';
    // }
    // if (!values.rePassword) {
    //   errors.rePassword = 'Re-password is required';
    // } else if (values.password !== values.rePassword) {
    //   errors.rePassword = 'Passwords should match';
    // }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      telephone: '',
      // password: '',
      // rePassword: '',
    },
    validate,
    onSubmit: (values) => {
      values.role = 'manager';
      dispatch(addManager(values));
    },
  });

  return (
    <>
      <Layout>
        <Container>
          <Form onSubmit={formik.handleSubmit}>
            <Row form>
              <Col className="col-6">
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
                        <p className="input-warning">
                          {formik.errors.firstName}
                        </p>
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
                        <p className="input-warning">
                          {formik.errors.lastName}
                        </p>
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
                        <p className="input-warning">
                          {formik.errors.telephone}
                        </p>
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
                        // onChange={formik.handleChange}
                        // onBlur={formik.handleBlur}
                        // value={formik.values.password}
                      />
                      {formik.errors.password && formik.touched.password && (
                        <p className="input-warning">
                          {formik.errors.password}
                        </p>
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
                        // onChange={formik.handleChange}
                        // onBlur={formik.handleBlur}
                        // value={formik.values.rePassword}
                      />
                      {formik.errors.rePassword &&
                        formik.touched.rePassword && (
                          <p className="input-warning">
                            {formik.errors.rePassword}
                          </p>
                        )}
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Button type="submit">ADD MANAGER</Button>
          </Form>
        </Container>
      </Layout>
    </>
  );
}

export default Managers;
