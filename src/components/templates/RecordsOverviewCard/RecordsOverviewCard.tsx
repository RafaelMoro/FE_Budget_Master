import { Divider, Typography } from '@mui/material';
import { Container, RecordContainer, ViewAllFirstButton } from './RecordsOverviewCard.styled';
import { AnyRecord } from '../../../globalInterface';
import { Record } from '../../UI/Records/Record';
import { PrimaryButton } from '../../../styles';

interface RecordsOverviewCardProps {
  records: AnyRecord[];
  color: string;
  viewAllRecords: () => void;
}

/*
* This component shows the last 10 records of the month.
* Since it receives all the records, it will slice the last 10 records.
*/
const RecordsOverviewCard = ({ records, color, viewAllRecords }: RecordsOverviewCardProps) => {
  const last10Records = records.slice(0, 10);

  return (
    <Container>
      <Typography variant="h5">Records overview</Typography>
      { records.length === 0 && (
      <Typography variant="body2">No records created yet. Start creating records this month to start showing statistics.</Typography>
      )}
      { last10Records.length > 0 && (
        <>
          <ViewAllFirstButton onClick={viewAllRecords}>View all records</ViewAllFirstButton>
          { last10Records.map((record) => (
            <RecordContainer key={record._id}>
              <Record
                backgroundColor={color}
                record={record}
              />
              <Divider />
            </RecordContainer>
          ))}
          <PrimaryButton onClick={viewAllRecords}>View all records</PrimaryButton>
        </>
      )}
    </Container>
  );
};

export { RecordsOverviewCard };
