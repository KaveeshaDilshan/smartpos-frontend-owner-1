/* eslint-disable */
import React from 'react';
import styles from './SalesPage.module.css';
import { Formik, Form, Field } from 'formik';

const initialValues = {
  from: '2021/09/05',
  to: '2021/09/06',
};
const onSubmit = (values) => {
  console.log(values);
};

function SalesPage() {
  return (
    <>
      <div className={styles.salespage}>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form className={styles.top}>
            <Field type="date" id="from" name="from" />
            <Field type="date" id="to" name="to" />
            <button type="submit">Select</button>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default SalesPage;
