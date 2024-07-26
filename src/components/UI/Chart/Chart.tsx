/* eslint-disable import/no-extraneous-dependencies */
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { AppColors } from '../../../styles';
import { getTopDaysExpensePerDay } from './Chart.util';

interface Result {
  date: string;
  amount: number;
}

const Chart = () => {
  const recordsState = useAppSelector((state) => state.records);
  const recordsData = recordsState?.currentMonthRecordsData;
  const [data, setData] = useState<Result[]>([]);

  const windowSize = useAppSelector((state) => state.userInterface.windowSize);
  const isMobile = windowSize === 'Mobile';

  useEffect(() => {
    if (recordsData) {
      const newData = getTopDaysExpensePerDay(recordsData);
      setData(newData);
    }
  }, [recordsData]);

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

  if (isMobile) {
    return (
      <Pie data={chartData} />
    );
  }

  return (
    <Bar data={chartData} />
  );
};

export { Chart };
