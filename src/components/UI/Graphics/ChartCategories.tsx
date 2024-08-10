import { Pie } from 'react-chartjs-2';
import { AnyRecord } from '../../../globalInterface';
import { useStatistics } from '../../../hooks/useStatistics';

interface ChartCategoriesProps {
  records: AnyRecord[];
}

const ChartCategories = ({ records }: ChartCategoriesProps) => {
  const { categoriesChartData } = useStatistics({ records });
  return (
    <Pie data={categoriesChartData} />
  );
};

export { ChartCategories };
