import {
  BarChart, Bar, CartesianGrid, Tooltip, Legend, XAxis, YAxis,
} from 'recharts';
import { Typography } from '@mui/material';

import { useAppSelector } from '../../../redux/hooks';
import { ChartExpensiveDaysProps } from './Chart.interface';
import { useStatistics } from '../../../hooks/useStatistics';
import { AppColors } from '../../../styles';

const ChartExpensiveDays = ({ records }: ChartExpensiveDaysProps) => {
  const windowSize = useAppSelector((state) => state.userInterface.windowSize);
  const isMobile = windowSize === 'Mobile';
  const { expensiveDaysData } = useStatistics({ records });

  if (isMobile) {
    return (
      <h1>Hi</h1>
    );
  }

  return (
    <div data-testid="chart-bar-expensive-days">
      {expensiveDaysData.length === 0 && (
        <Typography variant="body2">No data to display</Typography>
      )}
      { expensiveDaysData.length > 0 && (
        <BarChart width={500} height={300} data={expensiveDaysData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill={AppColors.primary} />
        </BarChart>
      )}
    </div>
  );
};

export { ChartExpensiveDays };
