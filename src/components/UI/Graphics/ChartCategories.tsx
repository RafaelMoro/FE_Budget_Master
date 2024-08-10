import { AnyRecord } from '../../../globalInterface';
import { useStatistics } from '../../../hooks/useStatistics';

interface ChartCategoriesProps {
  records: AnyRecord[];
}

const ChartCategories = ({ records }: ChartCategoriesProps) => {
  const { categoriesChartData } = useStatistics({ records });
  return (
    <h1>Categories chart</h1>
  );
};

export { ChartCategories };
