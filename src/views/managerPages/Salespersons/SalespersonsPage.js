import React from 'react';
// import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Button } from '@material-ui/core';
// import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import styles from './SalespersonsPage.module.css';
import { TableComponent } from './components/TableComponent';

function SalespersonsPage() {
  return (
    <>
      <div className={styles.salespersonspage}>
        <div className={styles.page__top}>
          <Button
            className={styles.addNew__button}
            component={NavLink}
            to="/manager/salespersons/addnew"
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
