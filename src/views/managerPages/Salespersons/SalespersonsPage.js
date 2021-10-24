import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, CircularProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch, useSelector } from 'react-redux';
import styles from './SalespersonsPage.module.css';
import ManagerLayout from '../../ManagerLayout';
import { getAllSalespersons } from './redux/salespersonsActions';
import TableComponent from './components/TableComponent';
import Loading from '../../../components/common/Loading';

function SalespersonsPage() {
  const history = useHistory();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const allSalespersons = useSelector(
    (state) => state.salespersonsReducer.allSalespersons
  );

  const totalSalespersons = useSelector(
    (state) => state.salespersonsReducer.totalSalespersons
  );
  const loading = useSelector((state) => state.salespersonsReducer.loading);

  const warehouseID = useSelector(
    (state) => state.dashboardReducer.warehouseID
  );

  React.useEffect(() => {
    dispatch(getAllSalespersons({ search, warehouseID, page }));
  }, [search, page]);
  return (
    <>
      <ManagerLayout search={search} setSearch={setSearch} isShow={true}>
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
          <TableComponent
            data={allSalespersons}
            setPage={setPage}
            totalRows={totalSalespersons}
          />
          {loading && (
            <>
              <div style={{ textAlign: 'center', marginTop: 50 }}>
                <CircularProgress style={{ color: 'red' }} />
              </div>
            </>
          )}
        </div>
      </ManagerLayout>
    </>
  );
}

export default SalespersonsPage;
