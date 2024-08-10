import {
  BarChart, Bar, CartesianGrid, Tooltip, Legend, XAxis, YAxis,
} from 'recharts';

const data = [
  {
    name: 'May 20',
    amount: 1300,
  },
  {
    name: 'May 21',
    amount: 1000,
  },
];

const TestChart = () => (
  <BarChart width={500} height={300} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="amount" fill="#8884d8" />
  </BarChart>
);

export { TestChart };
