import React from 'react';
// import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
// import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import SearchBar from '../../common/searchBar/SearchBar';
import styles from './SalespersonsPage.module.css';
import { TableComponent } from './components/TableComponent';
import { setSalespersonsFilter } from './redux/salespersonsActions';

function SalespersonsPage() {
  const filter = useSelector(
    (state) => state.salespersonsReducer.salespersonsFilter
  );
  const dispatch = useDispatch();
  const setFilter = (value) => {
    dispatch(setSalespersonsFilter(value));
  };
  return (
    <>
      <div className={styles.salespersonspage}>
        <div className={styles.page__top}>
          <div className={styles.searchbar}>
            <SearchBar
              placeholder="by name"
              filter={filter}
              setFilter={setFilter}
            />
          </div>
          <Button
            className={styles.addNew__button}
            component={NavLink}
            to="/salespersons/addnew"
            variant="contained"
          >
            <AddIcon /> Add New
          </Button>
        </div>
        <TableComponent />
      </div>
    </>
  );
}

export default SalespersonsPage;
