import { Typography } from '@mui/material';
import {
  CartesianGrid, Legend, LineChart, XAxis, YAxis, Tooltip, Line,
} from 'recharts';

import { AnyRecord } from '../../../globalInterface';
import { useStatistics } from '../../../hooks/useStatistics';
import { AppColors } from '../../../styles';
import { useAppSelector } from '../../../redux/hooks';

interface ChartCategoriesProps {
  records: AnyRecord[];
  showNoDisplayData?: boolean;
}

const ChartCategories = ({ records, showNoDisplayData }: ChartCategoriesProps) => {
  const { categoriesData } = useStatistics({ records });
  const windowSize = useAppSelector((state) => state.userInterface.windowSize);
  const isMobile = windowSize === 'Mobile';
  const lineWidth = isMobile ? 320 : 480;

  return (
    <div data-testid="categories-chart">
      { (categoriesData.length === 0 && showNoDisplayData) && (
        <Typography variant="body2">No data to display</Typography>
      )}
      { categoriesData.length > 0 && (
        <LineChart width={lineWidth} height={300} data={categoriesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke={AppColors.primaryDark} />
        </LineChart>
      )}
    </div>
  );
};

export { ChartCategories };
