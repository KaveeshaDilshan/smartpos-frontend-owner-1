import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { Typography } from '@material-ui/core';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import styles from './Dashboard.module.css';
import ManagerLayout from '../../ManagerLayout';
import SalesChart from './components/SalesChart';
import {
  getManagerWarehouse,
  getWarehouseSales,
} from './redux/dashboardActions';

function Dashboard() {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(moment().subtract(7, 'day'));
  const [endDate, setEndDate] = useState(moment().subtract(0, 'day'));
  const loggedManager = useSelector((state) => state.loginReducer.user);
  const warehouseSales = useSelector(
    (state) => state.dashboardReducer.warehouseSales
  );

  useEffect(() => {
    dispatch(getManagerWarehouse(loggedManager.warehouseId));
  }, [loggedManager]);
  useEffect(
    () =>
      dispatch(
        getWarehouseSales({
          warehouseID: loggedManager.warehouseId,
          startDate,
          endDate,
        })
      ),
    [startDate, endDate]
  );
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  return (
    <>
      <ManagerLayout>
        <div className={styles.dashboard}>
          <div
            style={{
              marginTop: 30,
              borderBottom: '3px solid #5BC67AD9',
              width: 'fit-content',
            }}
          >
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              Warehouse Sales Chart
            </Typography>
          </div>
          <Row className="mt-3">
            <Col>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  style={{ marginRight: 10 }}
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Start Date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="End Date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Col>
            {warehouseSales && <SalesChart sales={warehouseSales} />}
          </Row>
        </div>
      </ManagerLayout>
    </>
  );
}

export default Dashboard;
