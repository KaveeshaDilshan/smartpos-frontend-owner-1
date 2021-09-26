import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../../Layout';
import ProductCard from './ProductCard';
import { getOneSalesperson, getOneSalespersonProducts } from '../actions';
import SalespersonAnalytics from './SalespersonAnalytics';

function SalespersonPage(props) {
  const { id } = props.match.params;
  const dispatch = useDispatch();

  const { salespersonProducts, selectedDate } = useSelector(
    (state) => state.adminSalespersonReducer
  );
  useEffect(() => dispatch(getOneSalesperson(id)), []);
  const [oneDate, setOneDate] = useState(selectedDate);
  const handleOneDate = (date) => {
    setOneDate(date);
  };
  useEffect(
    () =>
      dispatch(
        getOneSalespersonProducts({
          id,
          oneDate,
        })
      ),
    [oneDate]
  );
  console.log(salespersonProducts);
  return (
    <Layout>
      <Row>
        <Col className="col-7">
          <SalespersonAnalytics id={id} />
        </Col>

        <Col className="col-4 m-5 pt-3">
          <Row>
            <Col>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
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
              {salespersonProducts.length > 0 && (
                <h3>Products that are assigned on {selectedDate}</h3>
              )}

              {salespersonProducts.length > 0 ? (
                salespersonProducts.map((product) => (
                  <ProductCard
                    key={product.name}
                    name={product.name}
                    unitPrice={product.unitPrice}
                    photo={product.photo}
                    quantity={product.quantity}
                    sales={product.sales}
                  />
                ))
              ) : (
                <h4>No Products are allocated on {selectedDate}</h4>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Layout>
  );
}

export default SalespersonPage;
