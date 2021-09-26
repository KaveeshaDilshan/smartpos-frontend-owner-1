import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import firebase from 'firebase/app';
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  uploadBytes,
} from 'firebase/storage';
// import * as firebase from 'firebase';
import {
  Avatar,
  Box,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
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
  console.log(storage);
  const dispatch = useDispatch();
  const [uploadPercentage, setUploadPercentage] = React.useState(0);
  const [imageUploading, setImageUploading] = React.useState(false);
  const [profilePic, setProfilePic] = React.useState('');
  const [profilePicURL, setProfilePicURL] = React.useState('');
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
  // const previewImage = async (event) => {
  //   setImageUploading(true);
  //   setProfilePic(URL.createObjectURL(event.target.files[0]));
  //   const storageRef = ref(
  //     storage,
  //     `${user._id}/${event.target.files[0].name}`
  //   );
  //   const uploadTask = uploadBytesResumable(storageRef, event.target.files[0]);
  //
  //   uploadTask.on(
  //     'state_changed',
  //     (snapshot) => {
  //       // Observe state change events such as progress, pause, and resume
  //       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //       const progress =
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       setUploadPercentage(progress);
  //       console.log(`Upload is ${progress}% done`);
  //       // eslint-disable-next-line default-case
  //       switch (snapshot.state) {
  //         case 'paused':
  //           console.log('Upload is paused');
  //           break;
  //         case 'running':
  //           console.log('Upload is running');
  //           break;
  //       }
  //     },
  //     (error) => {
  //       // Handle unsuccessful uploads
  //       setImageUploading(false);
  //     },
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         setImageUploading(false);
  //         console.log(downloadURL);
  //         setProfilePicURL(downloadURL);
  //       });
  //     }
  //   );
  //
  //   /* uploadBytes(storageRef, event.target.files[0]).then((snapshot) => {
  //     console.log('Uploaded a blob or file!');
  //     getDownloadURL(snapshot.ref).then((downloadURL) => {
  //       console.log(downloadURL);
  //       setProfilePicURL(downloadURL);
  //     });
  //   }); */
  // };
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
              <Input
                type="file"
                name="photo"
                id="photo"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.photo}
              />
              <Grid container spacing={2} style={{ marginTop: 40 }}>
                {imageUploading ? (
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: 40,
                    }}
                  >
                    <div>
                      <div style={{ textAlign: 'center', marginBottom: 5 }}>
                        <CircularProgressWithLabel value={uploadPercentage} />
                      </div>
                      <div>Image Uploading ...</div>
                    </div>
                  </Grid>
                ) : (
                  <>
                    <Grid
                      item
                      xs={12}
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      {/*<div style={{ position: 'relative' }}>*/}
                      {/*  <input*/}
                      {/*    accept="image/*"*/}
                      {/*    style={{ display: 'none' }}*/}
                      {/*    id="icon-button-file"*/}
                      {/*    type="file"*/}
                      {/*    multiple*/}
                      {/*    onChange={previewImage}*/}
                      {/*  />*/}
                      {/*  /!* eslint-disable-next-line jsx-a11y/label-has-associated-control *!/*/}
                      {/*  <label htmlFor="icon-button-file">*/}
                      {/*    <Avatar*/}
                      {/*      alt="A"*/}
                      {/*      src={profilePic}*/}
                      {/*      style={{ height: 150, width: 150 }}*/}
                      {/*    />*/}
                      {/*    <AddCircleIcon*/}
                      {/*      style={{*/}
                      {/*        color: 'black',*/}
                      {/*        cursor: 'pointer',*/}
                      {/*        fontSize: 50,*/}
                      {/*        position: 'absolute',*/}
                      {/*        bottom: 0,*/}
                      {/*        right: 0,*/}
                      {/*      }}*/}
                      {/*    />*/}
                      {/*  </label>*/}
                      {/*</div>*/}
                    </Grid>
                  </>
                )}
              </Grid>
            </FormGroup>
            <Button type="submit">Submit</Button>
          </Form>
        </div>
      </ManagerLayout>
    </>
  );
}

export default AddNewProduct;
