import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ChartDay = ({ data }) => {
  return (
    <LineChart width={750} height={450} data={data}>
      <XAxis dataKey="date" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="buy" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="sell" stroke="#82ca9d" />
    </LineChart>
  );
};



export default ChartDay;