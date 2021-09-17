import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import styles from './ProductDetails.module.css';
import { getOneProduct, updateProduct } from '../redux/productActions';

function ProductDetails(props) {
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const product = useSelector((state) => state.productReducer.oneProduct);
  let category = {};

  useEffect(() => {
    dispatch(getOneProduct(id));
  }, []);

  if (product.categoryId) {
    category = product.categoryId;
  }

  const initialValues = {
    product_category: category.name,
    product_name: product.name,
    unit_price: product.unitPrice,
    description: product.description,
    photo: '',
  };

  const onSubmit = (values) => {
    dispatch(
      updateProduct({
        id,
        details: {
          name: values.product_name,
          unitPrice: values.unit_price,
          description: values.description,
          photo: values.photo,
        },
      })
    );
  };
  const validate = (values) => {
    const errors = {};
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
    enableReinitialize: true,
  });

  return (
    <div className={styles.produt_details}>
      <Form onSubmit={formik.handleSubmit} className={styles.form}>
        <FormGroup>
          <Label for="product_name">Product Name</Label>
          <Input
            type="text"
            name="product_name"
            id="product_name"
            placeholder={product.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.product_name}
          />
          {formik.errors.product_name && formik.touched.product_name && (
            <p className={styles.input_warning}>{formik.errors.product_name}</p>
          )}
        </FormGroup>
        <FormGroup>
          <Label for="unit_price">Unit Price</Label>
          <Input
            type="number"
            name="unit_price"
            id="unit_price"
            placeholder={product.unitPrice}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.unit_price}
          />
          {formik.errors.unit_price && formik.touched.unit_price && (
            <p className={styles.input_warning}>{formik.errors.unit_price}</p>
          )}
        </FormGroup>
        <FormGroup>
          <Label for="product_category">Select Category</Label>
          <Input type="select" name="product_category" id="product_category">
            <option value={category._id}>{category.name}</option>
          </Input>
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
        <Button type="submit">Save</Button>
      </Form>
    </div>
  );
}

export default ProductDetails;
