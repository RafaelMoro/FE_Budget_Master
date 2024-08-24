import {
  BarChart, Bar, CartesianGrid, Tooltip, Legend, XAxis, YAxis,
} from 'recharts';
import { Typography } from '@mui/material';

import { useAppSelector } from '../../../redux/hooks';
import { ChartExpensiveDaysProps } from './Chart.interface';
import { useStatistics } from '../../../hooks/useStatistics';
import { AppColors } from '../../../styles';

const ChartExpensiveDays = ({ records, showNoDisplayData }: ChartExpensiveDaysProps) => {
  const windowSize = useAppSelector((state) => state.userInterface.windowSize);
  const isMobile = windowSize === 'Mobile';
  const barWidth = isMobile ? 320 : 480;
  const { expensiveDaysData } = useStatistics({ records });

  return (
    <div data-testid="chart-bar-expensive-days">
      { (expensiveDaysData.length === 0 && showNoDisplayData) && (
        <>
          <Typography variant="body2">Oops! It looks like there are no expenses to display right now.</Typography>
          <Typography variant="body2">Add some expenses to start tracking your spending and see the data visualized here.</Typography>
        </>
      )}
      { expensiveDaysData.length > 0 && (
        <BarChart width={barWidth} height={300} data={expensiveDaysData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill={AppColors.primaryDark} />
        </BarChart>
      )}
    </div>
  );
};

export { ChartExpensiveDays };
