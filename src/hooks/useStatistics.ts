import { useEffect, useState } from 'react';
import { AnyRecord } from '../globalInterface';
import { ChartCategoriesData, ChartExpensiveDaysData } from '../components/UI/Graphics/Chart.interface';
import { AppColors } from '../styles';
import { getCategoriesTotalExpense, getTopDaysExpensePerDay } from '../components/UI/Graphics/Chart.util';

interface UseStatisticsProps {
  records: AnyRecord[];
}

const useStatistics = ({ records }: UseStatisticsProps) => {
  const [expensiveDaysData, setExpensiveDaysData] = useState<ChartExpensiveDaysData[]>([]);
  const [categoriesData, setCategoriesData] = useState<ChartCategoriesData[]>([]);
  const categoriesChartData = {
    labels: categoriesData.map((item) => item.category),
    datasets: [
      {
        label: 'Categories amount spending',
        data: categoriesData.map((item) => item.amount),
        backgroundColor: [
          AppColors.primary,
          AppColors.secondary,
          AppColors.secondaryLight,
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    if (records.length > 0) {
      const newData = getTopDaysExpensePerDay(records);
      const newCategoriesData = getCategoriesTotalExpense(records);
      setExpensiveDaysData(newData);
      setCategoriesData(newCategoriesData);
    }
  }, [records]);

  return {
    expensiveDaysData,
    categoriesChartData,
  };
};

export { useStatistics };
