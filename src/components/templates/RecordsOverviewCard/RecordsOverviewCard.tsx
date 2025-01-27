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
      <Typography variant="h5">Visión general de las transacciones</Typography>
      { records.length === 0 && (
      <Typography variant="body2">No tienes transacciones aún. Empieza a crear registros este mes para ver las estadísticas.</Typography>
      )}
      { last10Records.length > 0 && (
        <>
          <ViewAllFirstButton onClick={viewAllRecords}>Ver transacciones</ViewAllFirstButton>
          { last10Records.map((record, index) => (
            <RecordContainer key={record._id}>
              <Record
                backgroundColor={color}
                record={record}
              />
              { (index !== last10Records.length - 1) && (<Divider />) }
            </RecordContainer>
          ))}
          <PrimaryButton onClick={viewAllRecords}>Ver transacciones</PrimaryButton>
        </>
      )}
    </Container>
  );
};

export { RecordsOverviewCard };
