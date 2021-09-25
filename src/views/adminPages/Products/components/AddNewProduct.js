import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import styles from './AddNewProduct.module.css';
import { getAllCategories } from '../../Category/redux/categoryActions';
import { addProduct } from '../redux/productActions';
import ManagerLayout from '../../../ManagerLayout';

function AddNewProduct() {
  const dispatch = useDispatch();
  const allCategories = useSelector(
    (state) => state.categoryReducer.allCategories
  );
  useEffect(() => {
    dispatch(getAllCategories());
  }, []);
  const initialValues = {
    product_category: '',
    product_name: '',
    unit_price: 0,
    description: '',
    photo: '',
  };
  const onSubmit = (values) => {
    dispatch(
      addProduct({
        name: values.product_name,
        categoryId: values.product_category,
        unitPrice: values.unit_price,
        description: values.description,
        photo: values.photo,
      })
    );
  };
  const validate = (values) => {
    const errors = {};
    if (
      !values.product_category ||
      values.product_category === 'Select Category'
    ) {
      errors.product_category = 'Category is required';
    }
    if (!values.product_name) {
      errors.product_name = 'Product name is required';
    }
    if (!values.unit_price) {
      errors.unit_price = 'Unit Price is Required';
    }
    return errors;
  };
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit,
  });
  return (
    <>
      <ManagerLayout>
        <div className={styles.addnew_product}>
          <Form onSubmit={formik.handleSubmit} className={styles.form}>
            <FormGroup>
              <Label for="product_name">Product Name</Label>
              <Input
                type="text"
                name="product_name"
                id="product_name"
                placeholder="enter product name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.product_name}
              />
              {formik.errors.product_name && formik.touched.product_name && (
                <p className={styles.input_warning}>
                  {formik.errors.product_name}
                </p>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="unit_price">Unit Price</Label>
              <Input
                type="number"
                name="unit_price"
                id="unit_price"
                placeholder="enter unit price"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.unit_price}
              />
              {formik.errors.unit_price && formik.touched.unit_price && (
                <p className={styles.input_warning}>
                  {formik.errors.unit_price}
                </p>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="product_category">Select Category</Label>
              <Input
                type="select"
                name="product_category"
                id="product_category"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.product_category}
              >
                <option>Select Category</option>
                {allCategories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Input>
              {formik.errors.product_category &&
                formik.touched.product_category && (
                  <p className={styles.input_warning}>
                    {formik.errors.product_category}
                  </p>
                )}
            </FormGroup>
            <FormGroup>
              <Label for="description">Product Description</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              />
            </FormGroup>
            <FormGroup>
              <Label for="photo">Photo</Label>
              <Input
                type="file"
                name="photo"
                id="photo"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.photo}
              />
            </FormGroup>
            <Button type="submit">Submit</Button>
          </Form>
        </div>
      </ManagerLayout>
    </>
  );
}

export default AddNewProduct;
