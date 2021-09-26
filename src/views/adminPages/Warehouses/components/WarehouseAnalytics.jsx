import React, { useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
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
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styles from './warehouse.module.css';
import { getOneWarehouseAnalytics } from '../actions';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 10,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function WarehouseAnalytics({ id }) {
  const dispatch = useDispatch();
  const { warehouseAnalytics } = useSelector((state) => state.warehouseReducer);
  const classes = useStyles();
  const [period, setPeriod] = React.useState(1);

  const handleChange = (event) => {
    setPeriod(event.target.value);
  };
  useEffect(() => {
    if (id) {
      dispatch(getOneWarehouseAnalytics({ id, period }));
    }
  }, [period, id]);

  const data = [];
  // eslint-disable-next-line array-callback-return
  Object.keys(warehouseAnalytics).map((value) => {
    data.push({ date: value, income: warehouseAnalytics[value].totalIncome });
  });
  console.log(period);
  return (
    <>
      <Row className={styles.warehouse}>
        <h4
          style={{
            fontWeight: '700',
            fontSize: '22px',
          }}
        >
          ANALYTICS FOR PAST {period} DAYS
        </h4>
        <Col className="col-6">
          <div style={{ borderBottom: '3px solid #5BC67AD9' }} />
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Days</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={period}
              defaultValue={1}
              onChange={handleChange}
            >
              {[...Array(30).keys()].slice(1, 30).map((x) => (
                <MenuItem value={x}>{x}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Col>
      </Row>
      <Row>
        <Col className="pt-3">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart width={730} height={250} data={data}>
              <CartesianGrid strokeDasharray="1" />
              <XAxis dataKey="date" />
              <YAxis dataKey="income" />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" width={1} fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </>
  );
}

export default WarehouseAnalytics;
