import { Typography } from '@mui/material';
import { Container } from './RecordsOverviewCard.styled';
import { AnyRecord } from '../../../globalInterface';
import { Record } from '../../UI/Records/Record';

const RecordsOverviewCard = ({ records, color }: { records: AnyRecord[], color: string }) => {
  const title = records.length > 0 ? 'Last 10 records' : 'Records overview';
  return (
    <Container>
      <Typography variant="h5">{title}</Typography>
      { records.length === 0 && (
      <Typography variant="body2">No records created yet. Start creating records this month to start showing statistics.</Typography>
      )}
      { records.length > 0 && records.map((record) => (
        <Record
          key={record._id}
          backgroundColor={color}
          record={record}
        />
      ))}
    </Container>
  );
};

export { RecordsOverviewCard };
