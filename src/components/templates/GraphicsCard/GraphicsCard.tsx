import { Typography } from '@mui/material';
import { GraphicsCardContainer, NoRecordsGraphicsCardContainer } from './GraphicsCard.styled';
import { ChartExpensiveDays } from '../../UI/Graphics';
import { AnyRecord } from '../../../globalInterface';

interface GraphicsCardProps {
  records: AnyRecord[];
}

const GraphicsCard = ({ records }: GraphicsCardProps) => {
  if (records.length === 0) {
    return (
      <NoRecordsGraphicsCardContainer>
        <Typography variant="h5">Useful statistics of your finances</Typography>
        <Typography variant="body2">No records created yet. Start creating records this month to start showing statistics.</Typography>
      </NoRecordsGraphicsCardContainer>
    );
  }

  return (
    <GraphicsCardContainer>
      <Typography variant="h5">Useful statistics of your finances</Typography>
      <ChartExpensiveDays records={records} />
    </GraphicsCardContainer>
  );
};

export { GraphicsCard };
