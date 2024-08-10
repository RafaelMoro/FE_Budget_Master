import { useAppSelector } from '../../../redux/hooks';
import { ChartExpensiveDaysProps } from './Chart.interface';
import { useStatistics } from '../../../hooks/useStatistics';

const ChartExpensiveDays = ({ records }: ChartExpensiveDaysProps) => {
  const windowSize = useAppSelector((state) => state.userInterface.windowSize);
  const isMobile = windowSize === 'Mobile';
  const { expensiveDaysChartData } = useStatistics({ records });

  if (isMobile) {
    return (
      <h1>Hi</h1>
    );
  }

  return (
    <h1>Bye</h1>
  );
};

export { ChartExpensiveDays };
