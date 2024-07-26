/* eslint-disable import/no-extraneous-dependencies */
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { AppColors } from '../../../styles';
import { getTop4DaysTotalAmount } from './Chart.util';

interface Result {
  date: string;
  amount: number;
}

const Chart = () => {
  const recordsState = useAppSelector((state) => state.records);
  const recordsData = recordsState?.currentMonthRecordsData;
  const [data, setData] = useState<Result[]>([]);

  useEffect(() => {
    if (recordsData) {
      const newData = getTop4DaysTotalAmount(recordsData);
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
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Bar data={chartData} />
  );
};

export { Chart };
