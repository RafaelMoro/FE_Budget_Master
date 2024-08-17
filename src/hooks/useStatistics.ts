import { useEffect, useState } from 'react';
import { AnyRecord } from '../globalInterface';
import { ChartCategoriesData, ChartExpensiveDaysData } from '../components/UI/Graphics/Chart.interface';
import { getCategoriesTotalExpense, getTopDaysExpensePerDay } from '../components/UI/Graphics/Chart.util';

interface UseStatisticsProps {
  records: AnyRecord[];
}

const useStatistics = ({ records }: UseStatisticsProps) => {
  const [expensiveDaysData, setExpensiveDaysData] = useState<ChartExpensiveDaysData[]>([]);
  const [categoriesData, setCategoriesData] = useState<ChartCategoriesData[]>([]);

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
    categoriesData,
  };
};

export { useStatistics };
