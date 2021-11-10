import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Container, Row, Col } from 'reactstrap';
import {
  Button,
  // Button,
  CircularProgress,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
// import AddIcon from '@material-ui/icons/Add';
// import { useHistory } from 'react-router-dom';
import { Autocomplete } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import ProductItem from './components/ProductItem';
import { getAllProducts } from './redux/productActions';
import styles from './ProductsPage.module.css';
import ManagerLayout from '../../ManagerLayout';
import { getAllCategories } from '../Category/redux/categoryActions';
import AddNewProduct from './components/AddNewProduct';

function ProductsPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isNewProductAdded, setNewProductAdded] = useState(false);
  const [search, setSearch] = useState('');
  const [categorySelect, setCategorySelect] = useState({});
  const [addProductOpen, setAddProductOpen] = useState(false);
  const allProducts = useSelector((state) => state.productReducer.allProducts);
  const loading = useSelector((state) => state.productReducer.loading);

  const allCategories = useSelector(
    (state) => state.categoryReducer.allCategories
  );
  React.useEffect(() => {
    dispatch(getAllProducts({ search, category: categorySelect._id }));
    dispatch(getAllCategories(''));
  }, [search, categorySelect, isNewProductAdded]);

  return (
    <>
      <ManagerLayout search={search} setSearch={setSearch} isShow={true}>
        <div className={styles.productsPage}>
          <div className={styles.top}>
            <Typography
              style={{
                display: 'flex',
                alignItems: 'flex-end',
              }}
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              Products List
            </Typography>
            <div>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={allCategories}
                getOptionLabel={(option) => option.name}
                onChange={(e, value) => setCategorySelect({ ...value })}
                style={{ width: 300 }}
                size="small"
                renderInput={(params) => (
                  <TextField {...params} label="Category" />
                )}
              />
            </div>
            <Button
              className={styles.addNew__button}
              variant="contained"
              type="button"
              onClick={() => setAddProductOpen(true)}
            >
              <AddIcon /> Add New
            </Button>
          </div>
          <Divider />
          <Divider />
          <br />
          <div>
            {!loading ? (
              <>
                <Grid container direction="row" spacing={2}>
                  {allProducts &&
                    allProducts.map((product) => (
                      <Grid
                        item
                        xs={11}
                        sm={6}
                        md={4}
                        lg={2}
                        className={styles.product}
                        key={product._id}
                      >
                        <ProductItem
                          productId={product._id}
                          name={product.name}
                          categoryName={product.categoryId.name}
                          unitPrice={product.unitPrice}
                          photoURL={product.photo}
                          description={product.description}
                        />
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
        <AddNewProduct
          open={addProductOpen}
          handleClose={setAddProductOpen}
          setNewProductAdded={setNewProductAdded}
        />
      </ManagerLayout>
    </>
  );
}

export default ProductsPage;
