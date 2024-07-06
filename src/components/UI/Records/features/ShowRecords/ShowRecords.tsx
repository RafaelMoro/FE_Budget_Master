import { ReactElement } from 'react';
import { AnyRecord } from '../../../../../globalInterface';
import { MonthRecordBox } from '../../Records.styled';

interface ShowRecordsProps {
  records: AnyRecord[];
  loading: boolean;
  error: boolean;
  showMessage?: boolean;
  onEmptyRecords: () => ReactElement;
  onShowMessage?: () => ReactElement;
  onLoadingRecords: () => ReactElement;
  onErrorRecords: () => ReactElement;
  renderRecords: (record: AnyRecord, index: number) => ReactElement;
}

const ShowRecords = ({
  records, loading, error, onEmptyRecords, onLoadingRecords, onErrorRecords, renderRecords, showMessage, onShowMessage,
}: ShowRecordsProps) => (
  <>
    { (loading) && onLoadingRecords() }
    { (error) && onErrorRecords() }
    { (!loading && !error && showMessage && onShowMessage) && onShowMessage() }
    { (!loading && !error && !showMessage && records?.length === 0) && onEmptyRecords() }
    { (!loading && !error && !showMessage && records?.length > 0) && (
      <MonthRecordBox>
        { records?.map(renderRecords) }
      </MonthRecordBox>
    ) }
  </>
);

export { ShowRecords };
