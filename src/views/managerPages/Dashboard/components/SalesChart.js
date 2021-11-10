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
  console.log(sales);
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
