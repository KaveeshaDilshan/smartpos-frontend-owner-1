import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import styles from './SalespersonsPage.module.css';
import { TableComponent } from './components/TableComponent';
import ManagerLayout from '../../ManagerLayout';

function SalespersonsPage() {
  const history = useHistory();
  return (
    <>
      <ManagerLayout>
        <div className={styles.salespersonspage}>
          <div className={styles.page__top}>
            <Button
              className={styles.addNew__button}
              onClick={() => history.push('/manager/salespersons/addnew')}
              variant="contained"
            >
              <AddIcon /> Add New
            </Button>
          </div>
          <TableComponent />
        </div>
      </ManagerLayout>
    </>
  );
}

export default SalespersonsPage;
