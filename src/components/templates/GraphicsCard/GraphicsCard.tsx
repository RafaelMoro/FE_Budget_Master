import { Typography } from '@mui/material';
import { GraphicsCardContainer } from './GraphicsCard.styled';
import { ChartExpensiveDays } from '../../UI/Graphics';
import { AnyRecord } from '../../../globalInterface';

interface GraphicsCardProps {
  records: AnyRecord[];
}

const GraphicsCard = ({ records }: GraphicsCardProps) => (
  <GraphicsCardContainer>
    <Typography>Useful statistics of your finances</Typography>
    <ChartExpensiveDays records={records} />
  </GraphicsCardContainer>
);

export { GraphicsCard };
