import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartHour = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={450}>
      <LineChart  data={data}>
      <XAxis dataKey="time" type="number" domain={['auto', 'auto']} tickFormatter={(unixTime) => new Date(unixTime).toLocaleTimeString()} />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="buy" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="sell" stroke="#82ca9d" />
    </LineChart>
    </ResponsiveContainer>
    
  );
};



export default ChartHour;