import React from 'react';
// import { useHistory } from 'react-router-dom';
import {
  LineChart,
  CartesianGrid,
  Legend,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

function SalesChart({ sales }) {
  // const data = [
  //   {
  //     name: '2021-09-19',
  //     sales: 2400,
  //   },
  //   {
  //     name: '2021-09-20',
  //     sales: 1398,
  //   },
  //   {
  //     name: '2021-09-21',
  //     sales: 9800,
  //   },
  // ];
  return (
    <>
      <div style={{ margin: 10 }}>
        <LineChart
          width={1000}
          height={400}
          data={sales}
          margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            label={{
              value: 'Income(Rs)',
              angle: -90,
              position: 'insideLeft',
              offset: -10,
            }}
          />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="totalSales" stroke="#8884d8" />
        </LineChart>
      </div>
    </>
  );
}

export default SalesChart;
