import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch, useSelector } from 'react-redux';
import styles from './SalespersonsPage.module.css';
import ManagerLayout from '../../ManagerLayout';
import { getAllSalespersons } from './redux/salespersonsActions';
import TableComponent from './components/TableComponent';

function SalespersonsPage() {
  const history = useHistory();
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const allSalespersons = useSelector(
    (state) => state.salespersonsReducer.allSalespersons
  );
  console.log(allSalespersons);
  // const loading = useSelector((state) => state.categoryReducer.loading);

  React.useEffect(() => {
    dispatch(getAllSalespersons(search));
  }, [search]);
  return (
    <>
      <ManagerLayout search={search} setSearch={setSearch}>
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
          <TableComponent data={allSalespersons} />
        </div>
      </ManagerLayout>
    </>
  );
}

export default SalespersonsPage;