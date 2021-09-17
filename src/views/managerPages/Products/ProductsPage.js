import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import SearchBar from '../../common/searchBar/SearchBar';
import ProductItem from './components/ProductItem';
import { getAllProducts } from './redux/productActions';
import styles from './ProductsPage.module.css';

function ProductsPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allProducts = useSelector((state) => state.productReducer.allProducts);
  const loading = useSelector((state) => state.productReducer.loading);

  React.useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <>
      <div className={styles.productspage}>
        <div className={styles.top}>
          <div className={styles.searchbar}>
            <SearchBar placeholder="by name" />
          </div>
          <Button
            className={styles.addNew__button}
            variant="contained"
            type="button"
            onClick={() => history.push('/products/addnew')}
          >
            <AddIcon /> Add New
          </Button>
        </div>
        <Divider />
        <Divider />
        <br />
        <div className={styles.bottom}>
          {!loading ? (
            <>
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                Products List
              </Typography>
              <Grid container direction="row" spacing={2}>
                {allProducts.map((product) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
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
    </>
  );
}

export default ProductsPage;
