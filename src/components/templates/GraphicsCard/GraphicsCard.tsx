/* eslint-disable react/no-unstable-nested-components */
import { Typography } from '@mui/material';
import { useMemo } from 'react';
import { GraphicsCardContainer, NoRecordsGraphicsCardContainer } from './GraphicsCard.styled';
import { ChartExpensiveDays } from '../../UI/Graphics';
import { AnyRecord } from '../../../globalInterface';
import { ChartCategories } from '../../UI/Graphics/ChartCategories';

interface GraphicsCardProps {
  records: AnyRecord[];
}

const GraphicsCard = ({ records }: GraphicsCardProps) => {
  const isEmptyChart = useMemo(() => records.every((record) => record.isPaid === undefined), [records]);

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
      { (isEmptyChart) && (
        <>
          <Typography variant="body2">Oops! It looks like there are no expenses to display right now. </Typography>
          <Typography variant="body2">Add some expenses to start tracking your spending and see the data visualized here.</Typography>
        </>
      )}
      { (!isEmptyChart) && (
        <>
          <ChartExpensiveDays records={records} />
          <ChartCategories records={records} />
        </>
      )}
    </GraphicsCardContainer>
  );
};

export { GraphicsCard };
