/* eslint-disable react/no-unstable-nested-components */
import { Typography } from '@mui/material';
import { useMemo } from 'react';
import { GraphicsCardContainer, NoRecordsGraphicsCardContainer, TextWithMarginBottom } from './GraphicsCard.styled';
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
        <Typography variant="h5">Estadísticas de tus finanzas</Typography>
        <Typography variant="body2">No hay transacciones. Empieza a crear registros este mes para mostrar estadísticas.</Typography>
      </NoRecordsGraphicsCardContainer>
    );
  }

  return (
    <GraphicsCardContainer>
      <TextWithMarginBottom margin="2" variant="h5">Estadísticas de tus finanzas</TextWithMarginBottom>
      { (isEmptyChart) && (
        <>
          <Typography variant="body2">Oops! No hay gastos que mostrar en este momento. </Typography>
          <TextWithMarginBottom margin="5" variant="body2">
            Agrega gastos para comenzar a monitorear tus finanzas y visualizar los datos aquí.
          </TextWithMarginBottom>
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
