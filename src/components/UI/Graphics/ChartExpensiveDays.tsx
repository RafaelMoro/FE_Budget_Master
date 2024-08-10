/* eslint-disable import/no-extraneous-dependencies */
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';

import { useAppSelector } from '../../../redux/hooks';
import { ChartExpensiveDaysProps } from './Chart.interface';
import { useStatistics } from '../../../hooks/useStatistics';

const ChartExpensiveDays = ({ records }: ChartExpensiveDaysProps) => {
  const windowSize = useAppSelector((state) => state.userInterface.windowSize);
  const isMobile = windowSize === 'Mobile';
  const { expensiveDaysChartData } = useStatistics({ records });

  if (isMobile) {
    return (
      <Line data={expensiveDaysChartData} />
    );
  }

  return (
    <Bar data={expensiveDaysChartData} />
  );
};

export { ChartExpensiveDays };
