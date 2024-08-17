import { ReactElement, ReactNode } from 'react';
import { Divider, Typography } from '@mui/material';
import { AnyRecord } from '../../../../../globalInterface';
import { MonthAccordeon } from '../MonthAccordeon';
import { ShowRecords } from '../ShowRecords';
import { Record } from '../../Record';
import { AppColors, FlexContainer } from '../../../../../styles';
import { RecordExpense, RecordIncome } from '../../Records.styled';
import { ShowTotalContianer } from '../Features.styled';
import { GraphicsCard } from '../../../../templates/GraphicsCard';

interface MonthRecordsProps {
  color: string;
  openedAccordeon: boolean;
  titleMonthAccordeon: string;
  totalExpense: string;
  totalIncome: string;
  accountId: string;
  records: AnyRecord[];
  loading: boolean;
  error: boolean;
  isGuestUser: boolean;
  onEmptyCb: () => ReactElement;
  onErrorCb: () => ReactElement;
  onLoadingCb: () => ReactElement;
  children?: ReactNode;
  isOlderRecords?: boolean;
  showMessage?: boolean;
  onClickCb?: () => Promise<void> | void;
  onShowMessage?: () => ReactElement;
}

const MonthRecords = ({
  color, openedAccordeon, titleMonthAccordeon, accountId, isGuestUser, isOlderRecords, showMessage,
  records, loading, error, onEmptyCb, onLoadingCb, onErrorCb, totalExpense, totalIncome, onShowMessage,
  onClickCb = () => {}, children,
}: MonthRecordsProps) => (
  <MonthAccordeon
    color={AppColors.bgColorDark}
    opened={openedAccordeon}
    title={titleMonthAccordeon}
    accountId={accountId}
    onClickCallback={onClickCb}
  >
    { (!isGuestUser) && (
      <ShowTotalContianer>
        <FlexContainer gap={2}>
          <Typography>Total Expense: </Typography>
          <RecordExpense data-testid="total-expense-number">{totalExpense}</RecordExpense>
        </FlexContainer>
        { (isOlderRecords && children) && children }
        <FlexContainer gap={2}>
          <Typography>Total Income: </Typography>
          <RecordIncome data-testid="total-income-number">{totalIncome}</RecordIncome>
        </FlexContainer>
      </ShowTotalContianer>
    ) }
    { (isGuestUser && isOlderRecords && children) && children }
    <GraphicsCard records={records} />
    <ShowRecords
      records={records}
      loading={loading}
      error={error}
      showMessage={showMessage}
      onShowMessage={onShowMessage}
      onEmptyRecords={onEmptyCb}
      onErrorRecords={onErrorCb}
      onLoadingRecords={onLoadingCb}
      renderRecords={
          (record: AnyRecord, index: number) => (
            <div key={record._id}>
              { (index === 0) && (<Divider />) }
              <Record
                backgroundColor={color}
                record={record}
              />
              <Divider />
            </div>
          )
        }
    />
  </MonthAccordeon>
);

export { MonthRecords };
