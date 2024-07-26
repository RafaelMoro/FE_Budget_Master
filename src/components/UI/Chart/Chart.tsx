/* eslint-disable import/no-extraneous-dependencies */
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

import { useAppSelector } from '../../../redux/hooks';
import { AppColors } from '../../../styles';

const Chart = () => {
  const recordsState = useAppSelector((state) => state.records);
  const recordsData = recordsState?.currentMonthRecordsData;
  const data = (recordsData ?? []).map((record) => ({
    date: record.fullDate,
    amount: record.amount,
  }));
  const chartData = {
    labels: data.map((record) => record.date),
    datasets: [
      {
        label: 'Daily amount spending',
        data: data.map((record) => record.amount),
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
