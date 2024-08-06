/* eslint-disable import/no-extraneous-dependencies */
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { useEffect, useState } from 'react';

import { useAppSelector } from '../../../redux/hooks';
import { AppColors } from '../../../styles';
import { getTopDaysExpensePerDay } from './Chart.util';
import { ChartExpensiveDaysData, ChartExpensiveDaysProps } from './Chart.interface';

const ChartExpensiveDays = ({ records }: ChartExpensiveDaysProps) => {
  const windowSize = useAppSelector((state) => state.userInterface.windowSize);
  const isMobile = windowSize === 'Mobile';
  const [data, setData] = useState<ChartExpensiveDaysData[]>([]);
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: 'Daily amount spending',
        data: data.map((item) => item.amount),
        backgroundColor: [
          AppColors.primary,
          AppColors.secondary,
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    if (records.length > 0) {
      const newData = getTopDaysExpensePerDay(records);
      setData(newData);
    }
  }, [records]);

  if (isMobile) {
    return (
      <Line data={chartData} />
    );
  }

  return (
    <Bar data={chartData} />
  );
};

export { ChartExpensiveDays };
