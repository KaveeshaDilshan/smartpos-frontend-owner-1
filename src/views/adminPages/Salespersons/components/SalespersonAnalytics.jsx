import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {
  ResponsiveContainer,
  BarChart,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Bar,
} from 'recharts';
import DateFnsUtils from '@date-io/date-fns';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  getOneSalespersonAnalytics,
  getOneSalespersonProducts,
} from '../actions';
// eslint-disable-next-line import/no-cycle
import Compare from './Compare';

const useStyles = makeStyles({
  but: {
    marginTop: 25,
    marginLeft: 45,
    display: 'none',
  },
});

function SalespersonAnalytics({ id }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [startDate, setStartDate] = useState(moment().subtract(10, 'day'));
  const [endDate, setEndDate] = useState(moment().subtract(1, 'day'));
  const [currentChart, setCurrentChart] = useState('INCOME');
  const [open, setOpen] = useState(false);
  const { days, totalIncome, totalSales, totalQuantity } = useSelector(
    (state) => state.adminSalespersonReducer
  );
  useEffect(
    () => dispatch(getOneSalespersonAnalytics({ id, startDate, endDate })),
    [startDate, endDate]
  );

  const chartData = new Map();
  chartData.set('INCOME', []);
  chartData.set('SALES', []);
  days.forEach((value, index) => {
    chartData.get('INCOME').push({
      date: value,
      INCOME: totalIncome[index],
      QUANTITY: totalQuantity[index],
    });
    chartData.get('SALES').push({
      date: value,
      SALES: totalSales[index],
      QUANTITY: totalQuantity[index],
    });
  });

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment) {
      setCurrentChart(newAlignment);
    }
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  useEffect(
    () =>
      dispatch(
        getOneSalespersonProducts({
          id,
          oneDate: moment().add(1, 'day'),
        })
      ),
    [startDate, endDate]
  );
  const handleClick = (e) => {
    dispatch(
      getOneSalespersonProducts({
        id,
        oneDate: moment(e.date),
      })
    );
  };

  return (
    <>
      <Row>
        <Col>
          <Row>
            <Col>
              <ToggleButtonGroup
                value={currentChart}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
              >
                <ToggleButton value="INCOME" aria-labelledby="incomeButton">
                  <label id="incomeButton">Income</label>
                </ToggleButton>
                <ToggleButton value="SALES" aria-labelledby="salesButton">
                  <label id="salesButton">Sales</label>
                </ToggleButton>
              </ToggleButtonGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date picker inline"
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
                  label="Date picker inline"
                  value={endDate}
                  onChange={handleEndDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
              <Button
                size="large"
                type="submit"
                className={clsx(classes.but)}
                variant="outlined"
                onClick={() => setOpen(!open)}
              >
                Compare
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              {open && <Compare open={open} setOpen={setOpen} />}
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  width={730}
                  height={250}
                  data={chartData.get(currentChart)}
                >
                  <CartesianGrid strokeDasharray="1" onClick={handleClick} />
                  <XAxis dataKey="date" />
                  <YAxis dataKey={currentChart} onClick={handleClick} />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey={currentChart}
                    width={1}
                    fill="#8884d8"
                    onClick={handleClick}
                  />
                  <Bar
                    dataKey="QUANTITY"
                    width={1}
                    fill="#82ca9d"
                    onClick={handleClick}
                  />
                </BarChart>
              </ResponsiveContainer>
              <Typography>
                Total Income Over the Time Period - Rs.
                {/* eslint-disable-next-line func-names */}
                {totalIncome.reduce(function (a, b) {
                  return a + b;
                }, 0)}
              </Typography>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default SalespersonAnalytics;
