import { ReactElement, ReactNode } from 'react';
import { Divider, Typography } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { AnyRecord } from '../../../../../globalInterface';
import { MonthAccordeon } from '../MonthAccordeon';
import { ShowRecords } from '../ShowRecords';
import { Record } from '../../Record';
import { FlexContainer } from '../../../../../styles';
import { RecordExpense, RecordIncome, RecordMapWrapper } from '../../Records.styled';
import { ShowTotalContianer } from '../Features.styled';

interface MonthRecordsProps {
  color: string;
  openedAccordeon: boolean;
  titleMonthAccordeon: string;
  totalExpense: string;
  totalIncome: string;
  children?: ReactNode;
  onClickCb?: () => Promise<void> | void;
  isOlderRecords?: boolean;
  accountId: string;
  records: AnyRecord[];
  loading: boolean;
  error: boolean;
  isGuestUser: boolean;
  showMessage?: boolean;
  onShowMessage?: () => ReactElement;
  onEmptyCb: () => ReactElement;
  onErrorCb: () => ReactElement;
  onLoadingCb: () => ReactElement;
}
const base = 4;
const t = (d: number) => d * base;

const MonthRecords = ({
  color, openedAccordeon, titleMonthAccordeon, accountId, isGuestUser, isOlderRecords, showMessage,
  records, loading, error, onEmptyCb, onLoadingCb, onErrorCb, totalExpense, totalIncome, onShowMessage,
  onClickCb = () => {}, children,
}: MonthRecordsProps) => (
  <MonthAccordeon
    color={color}
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
    <AnimatePresence>
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
            <RecordMapWrapper
              key={record._id}
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: 'auto',
                opacity: 1,
                transition: {
                  type: 'spring',
                  bounce: 0.3,
                  opacity: { delay: t(0.025) },
                },
              }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: t(0.15),
                type: 'spring',
                bounce: 0,
                opacity: { duration: t(0.03) },
              }}
            >
              { (index === 0) && (<Divider />) }
              <Record
                backgroundColor={color}
                record={record}
              />
              <Divider />
            </RecordMapWrapper>
          )
        }
      />
    </AnimatePresence>
  </MonthAccordeon>
);

export { MonthRecords };
