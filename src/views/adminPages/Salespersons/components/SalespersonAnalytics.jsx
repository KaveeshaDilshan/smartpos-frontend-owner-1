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
import Layout from '../../../Layout';
import {
  getOneSalesperson,
  getOneSalespersonAnalytics,
  getOneSalespersonProducts,
} from '../actions';
import ProductCard from './ProductCard';

function SalespersonAnalytics(props) {
  const { id } = props.match.params;
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(moment().subtract(10, 'day'));
  const [endDate, setEndDate] = useState(moment().subtract(1, 'day'));
  const [oneDate, setOneDate] = useState(moment().subtract(1, 'day'));
  const [currentChart, setCurrentChart] = useState('income');
  const { days, totalIncome, totalSales, totalQuantity, salespersonProducts } =
    useSelector((state) => state.adminSalespersonReducer);
  // const salesperson = useSelector(
  //   (state) => state.adminSalespersonReducer.salesperson
  // );
  useEffect(() => dispatch(getOneSalesperson(id)), []);
  useEffect(
    () => dispatch(getOneSalespersonAnalytics({ id, startDate, endDate })),
    [startDate, endDate]
  );
  useEffect(
    () => dispatch(getOneSalespersonProducts({ id, oneDate })),
    [salespersonProducts]
  );
  const chartData = new Map();
  chartData.set('income', []);
  chartData.set('sales', []);
  chartData.set('quantity', []);
  days.forEach((value, index) => {
    chartData.get('income').push({ date: value, income: totalIncome[index] });
    chartData.get('sales').push({ date: value, sales: totalSales[index] });
    chartData
      .get('quantity')
      .push({ date: value, quantity: totalQuantity[index] });
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

  const handleOneDate = (date) => {
    setOneDate(date);
  };
  return (
    <Layout>
      <Row>
        <Col className="col-7">
          <Row>
            <Col className="col-6">
              <ToggleButtonGroup
                value={currentChart}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
              >
                <ToggleButton value="income" aria-labelledby="incomeButton">
                  <label id="incomeButton">Income</label>
                </ToggleButton>
                <ToggleButton value="sales" aria-labelledby="salesButton">
                  <label id="salesButton">Sales</label>
                </ToggleButton>
                <ToggleButton value="quantity" aria-labelledby="quantityButton">
                  <label id="quantityButton">Quantity</label>
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
            </Col>
          </Row>
          <Row>
            <Col>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  width={730}
                  height={250}
                  data={chartData.get(currentChart)}
                >
                  <CartesianGrid strokeDasharray="1" />
                  <XAxis dataKey="date" />
                  <YAxis dataKey={currentChart} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey={currentChart} width={20} fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Col>
          </Row>
        </Col>

        <Col className="col-4 m-5 pt-3">
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
                  value={oneDate}
                  onChange={handleOneDate}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Col>
          </Row>
          <Row>
            <Col>
              {salespersonProducts.map((product) => (
                <ProductCard
                  name={product.name}
                  unitPrice={product.unitPrice}
                  photo={product.photo}
                  quantity={product.quantity}
                  sales={product.sales}
                />
              ))}
            </Col>
          </Row>
        </Col>
      </Row>
    </Layout>
  );
}

export default SalespersonAnalytics;
