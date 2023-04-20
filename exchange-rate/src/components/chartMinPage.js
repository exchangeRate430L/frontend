import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ChartMin = ({ data }) => {
  return (
    <LineChart width={600} height={300} data={data}>
      <XAxis dataKey="time" type="number" domain={['auto', 'auto']} tickFormatter={(unixTime) => new Date(unixTime).toLocaleTimeString()} />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="buy" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="sell" stroke="#82ca9d" />
    </LineChart>
  );
};



export default ChartMin;