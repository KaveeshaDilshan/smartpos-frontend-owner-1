import React, { useState } from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Divider, Grid, Button, Typography } from '@material-ui/core';
import { Label } from 'reactstrap';
import { getAllCategories, addCategory } from './redux/categoryActions';
import styles from './CategoryPage.module.css';
import ManagerLayout from '../../ManagerLayout';

function CategoryPage() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const allCategories = useSelector(
    (state) => state.categoryReducer.allCategories
  );
  const loading = useSelector((state) => state.categoryReducer.loading);

  React.useEffect(() => {
    dispatch(getAllCategories(search));
  }, [search]);

  const initialValues = {
    category_name: '',
  };

  const onSubmit = (values) => {
    dispatch(addCategory({ name: values.category_name }));
    dispatch(getAllCategories(search));
  };

  const validate = (values) => {
    const errors = {};
    if (!values.category_name) {
      errors.category_name = 'Category is required!';
    }
    return errors;
  };

  return (
    <>
      <ManagerLayout search={search} setSearch={setSearch} isShow={true}>
        <div className={styles.categorypage}>
          <div className={styles.top}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              Add New Category
            </Typography>
            <br />
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validate={validate}
            >
              <Form>
                <Grid
                  container
                  direction="row"
                  spacing={2}
                  className={styles.top_grid}
                >
                  <Grid item>
                    <Label sm={12}>Category Name:</Label>
                  </Grid>
                  <Grid item>
                    <Field
                      type="text"
                      id="category_name"
                      name="category_name"
                      style={{
                        border: '1px solid gray',
                        borderRadius: 5,
                        padding: 5,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <ErrorMessage
                      name="category_name"
                      render={(msg) => (
                        <div className={styles.error_msg}>{msg}</div>
                      )}
                    />
                  </Grid>
                </Grid>
                <br />
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    backgroundImage: 'linear-gradient(#0dccea, #0d70ea)',
                    color: 'white',
                  }}
                >
                  Add
                </Button>
              </Form>
            </Formik>
          </div>
          <Divider style={{ height: 2, backgroundColor: 'black' }} />
          <div className={styles.bottom}>
            {!loading ? (
              <>
                <div className={styles.bottom_title}>
                  <Typography
                    component="h2"
                    variant="h6"
                    color="primary"
                    gutterBottom
                  >
                    Categories
                  </Typography>
                </div>
                <Grid container direction="row">
                  {allCategories.map((category) => (
                    <Grid
                      item
                      xs={11}
                      sm={4}
                      md={3}
                      key={category._id}
                      className={styles.category}
                    >
                      {category.name}
                    </Grid>
                  ))}
                </Grid>
              </>
            ) : (
              <>
                <div style={{ textAlign: 'center', marginTop: 50 }}>
                  <CircularProgress style={{ color: 'red' }} />
                </div>
              </>
            )}
          </div>
        </div>
      </ManagerLayout>
    </>
  );
}

export default CategoryPage;
