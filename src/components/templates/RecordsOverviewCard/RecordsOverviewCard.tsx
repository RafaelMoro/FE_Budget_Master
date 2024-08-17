import { Typography } from '@mui/material';
import { Container } from './RecordsOverviewCard.styled';
import { AnyRecord } from '../../../globalInterface';
import { Record } from '../../UI/Records/Record';
import { PrimaryButton } from '../../../styles';

/*
* This component shows the last 10 records of the month.
* Since it receives all the records, it will slice the last 10 records.
*/
const RecordsOverviewCard = ({ records, color }: { records: AnyRecord[], color: string }) => {
  const last10Records = records.slice(0, 10);
  const title = records.length > 0 ? 'Last 10 records' : 'Records overview';

  return (
    <Container>
      <Typography variant="h5">{title}</Typography>
      { records.length === 0 && (
      <Typography variant="body2">No records created yet. Start creating records this month to start showing statistics.</Typography>
      )}
      { last10Records.length > 0 && last10Records.map((record) => (
        <Record
          key={record._id}
          backgroundColor={color}
          record={record}
        />
      ))}
      <PrimaryButton>View all records</PrimaryButton>
    </Container>
  );
};

export { RecordsOverviewCard };
