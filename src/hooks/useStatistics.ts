import { useEffect, useState } from 'react';
import { AnyRecord } from '../globalInterface';
import { ChartExpensiveDaysData } from '../components/UI/Graphics/Chart.interface';
import { AppColors } from '../styles';
import { getTopDaysExpensePerDay } from '../components/UI/Graphics/Chart.util';

interface UseStatisticsProps {
  records: AnyRecord[];
}

const useStatistics = ({ records }: UseStatisticsProps) => {
  const [expensiveDaysData, setExpensiveDaysData] = useState<ChartExpensiveDaysData[]>([]);
  const expensiveDaysChartData = {
    labels: expensiveDaysData.map((item) => item.date),
    datasets: [
      {
        label: 'Daily amount spending',
        data: expensiveDaysData.map((item) => item.amount),
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
      setExpensiveDaysData(newData);
    }
  }, [records]);

  return {
    expensiveDaysChartData,
  };
};

export { useStatistics };
