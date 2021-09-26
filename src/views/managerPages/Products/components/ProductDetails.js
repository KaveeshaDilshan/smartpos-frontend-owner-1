import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import { toast } from 'react-toastify';
import styles from './ProductDetails.module.css';
import { getOneProduct, updateProduct } from '../redux/productActions';
import ManagerLayout from '../../../ManagerLayout';
import { storage } from '../../../../const/firebase.config';

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

function ProductDetails(props) {
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const product = useSelector((state) => state.productReducer.oneProduct);
  const [url, setUrl] = useState(product.photo);
  let category = {};

  useEffect(() => {
    setUrl(product.photo);
  }, [product]);
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
          console.log(error);
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
                placeholder={product.unitPrice}
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
              >
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
              <div style={{ display: 'flex' }}>
                <input type="file" onChange={handleChange} />
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
            <Button type="submit">Save</Button>
          </Form>
        </div>
      </ManagerLayout>
    </>
  );
}

export default ProductDetails;
