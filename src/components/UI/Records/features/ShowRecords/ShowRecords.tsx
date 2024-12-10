import { ReactElement } from 'react';
import { IconButton } from '@mui/material';

import { AnyRecord } from '../../../../../globalInterface';
import { MonthRecordBox } from '../../Records.styled';
import { AppIcon } from '../../../Icons';

interface ShowRecordsProps {
  records: AnyRecord[];
  loading: boolean;
  error: boolean;
  showMessage?: boolean;
  showAllRecords: boolean;
  onShowAllRecords: () => ReactElement;
  hideAllRecords: () => void;
  onEmptyRecords: () => ReactElement;
  onShowMessage?: () => ReactElement;
  onLoadingRecords: () => ReactElement;
  onErrorRecords: () => ReactElement;
  renderRecords: (record: AnyRecord, index: number) => ReactElement;
}

const ShowRecords = ({
  records, loading, error, showAllRecords, showMessage,
  onEmptyRecords, onLoadingRecords, onErrorRecords, renderRecords, onShowMessage, hideAllRecords, onShowAllRecords,
}: ShowRecordsProps) => (
  <>
    { (loading) && onLoadingRecords() }
    { (error) && onErrorRecords() }
    { (!loading && !error && showMessage && onShowMessage) && onShowMessage() }
    { (!loading && !error && !showMessage && records?.length === 0) && onEmptyRecords() }
    { (!loading && !error && !showMessage && records?.length > 0 && !showAllRecords) && onShowAllRecords() }
    { (!loading && !error && !showMessage && records?.length > 0 && showAllRecords) && (
      <MonthRecordBox>
        <IconButton onClick={hideAllRecords}>
          <AppIcon icon="GoBack" />
        </IconButton>
        { records?.map(renderRecords) }
      </MonthRecordBox>
    ) }
  </>
);

export { ShowRecords };
