import React, { useState } from 'react';
import { Table } from 'reactstrap';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import ManagerLayout from '../../ManagerLayout';
import styles from './SalesPage.module.css';
import { getSalespersonsSalesByDateRange } from './redux/salesActions';

function SalesPage() {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(Moment().subtract(7, 'days'));
  const [endDate, setEndDate] = useState(Moment());

  const loading = useSelector((state) => state.salesReducer.loading);
  const sales = useSelector((state) => state.salesReducer.sales);
  const warehouseId = useSelector(
    (state) => state.dashboardReducer.warehouseID
  );
  React.useEffect(() => {
    dispatch(
      getSalespersonsSalesByDateRange({
        warehouseId,
        startDate,
        endDate,
      })
    );
  }, []);
  const handleBtnClick = () => {
    dispatch(
      getSalespersonsSalesByDateRange({
        warehouseId,
        startDate: Moment(startDate),
        endDate: Moment(endDate),
      })
    );
  };
  console.log(sales);
  return (
    <>
      <ManagerLayout>
        <div className={styles.salespage}>
          <Typography
            component="h2"
            variant="h4"
            color="primary"
            gutterBottom
            style={{ marginBottom: 20, marginTop: 10 }}
          >
            SALESPERSONS LEADERBOARD
          </Typography>
          <div style={{ marginBottom: 20, marginTop: 10 }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                style={{ marginRight: 50 }}
                // margin="normal"
                id="from"
                // label="Date picker dialog"
                format="yyyy/MM/dd/"
                value={startDate}
                onChange={setStartDate}
                KeyboardButtonProps={{
                  'aria-label': 'start date',
                }}
              />
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                // margin="normal"
                id="to"
                // label="Date picker dialog"
                format="yyyy/MM/dd/"
                value={endDate}
                onChange={setEndDate}
                KeyboardButtonProps={{
                  'aria-label': 'end date',
                }}
              />
            </MuiPickersUtilsProvider>
            <Button
              style={{
                marginLeft: 50,
                backgroundImage: 'linear-gradient(#0dccea, #0d70ea',
                color: 'white',
              }}
              variant="contained"
              type="button"
              onClick={handleBtnClick}
            >
              Select
            </Button>
          </div>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Total Sales</th>
              </tr>
            </thead>
            {!loading && (
              <tbody>
                {sales.map((row, index) => (
                  <tr key={row._id}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      {row.firstName} {row.lastName}
                    </td>
                    <td>{row.email}</td>
                    <td>{row.income}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </Table>
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

export default SalesPage;
