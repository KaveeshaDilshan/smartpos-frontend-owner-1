import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import {
  Avatar,
  Box,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { toast } from 'react-toastify';
import { storage } from '../../../../const/firebase.config';
import styles from './AddNewProduct.module.css';
import { getAllCategories } from '../../Category/redux/categoryActions';
import { addProduct } from '../redux/productActions';
import ManagerLayout from '../../../ManagerLayout';

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(
          // eslint-disable-next-line react/destructuring-assignment
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function AddNewProduct() {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const allCategories = useSelector(
    (state) => state.categoryReducer.allCategories
  );
  useEffect(() => {
    dispatch(getAllCategories(''));
  }, []);
  const initialValues = {
    product_category: '',
    product_name: '',
    unit_price: 0,
    description: '',
  };
  const onSubmit = (values) => {
    dispatch(
      addProduct({
        name: values.product_name,
        categoryId: values.product_category,
        unitPrice: values.unit_price,
        description: values.description,
        photo: url,
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
  const handleUpload = () => {
    if (image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progresss = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progresss);
        },
        (error) => {
          toast.error(error);
        },
        () => {
          storage
            .ref('images')
            .child(image.name)
            .getDownloadURL()
            .then((URL) => {
              setUrl(URL);
            });
        }
      );
    } else {
      toast.error('Choose a photo');
    }
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

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
              <Label for="unit_price">Unit Price(Rs)</Label>
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
              <div style={{ display: 'flex' }}>
                <input type="file" onChange={handleChange} required />
                <Button type="button" onClick={handleUpload}>
                  Upload
                </Button>
                <div style={{ display: 'flex' }}>
                  <img
                    style={{ height: 100, width: 100, marginRight: 10 }}
                    src={url || 'http://via.placeholder.com/300'}
                    alt="product-poto"
                  />
                  <div>
                    <CircularProgressWithLabel value={progress} />
                  </div>
                </div>
              </div>
            </FormGroup>
            <Button type="submit">Submit</Button>
          </Form>
        </div>
      </ManagerLayout>
    </>
  );
}

export default AddNewProduct;
