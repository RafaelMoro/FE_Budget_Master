/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-console */
import { useEffect } from 'react';

import { Error } from '../../../Error';
import {
  GET_EXPENSES_AND_INCOMES_BY_MONTH_ROUTE, NO_EXPENSES_OR_INCOMES_FOUND,
} from '../../constants';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { AppColors, FlexContainer } from '../../../../../styles';
import { List } from '../../Records.styled';
import { useDate } from '../../../../../hooks/useDate';
import { NoRecordsFoundOnMonth } from '../NoRecordsFoundOnMonth';
import { ShowMultipleRecordLoader } from '../ShowMultipleRecordLoaders';
import { MonthRecords } from '../MonthRecords';
import { NoRecordsFound } from '../NoRecordsFound';
import { NoAccountsFound } from '../../../Account/features/NoAccountsFound';
import { HorizontalLoader } from '../../../HorizontalLoader';
import {
  useFetchRecordsByMonthYearQuery, useLazyFetchRecordsByMonthYearQuery,
} from '../../../../../redux/slices/Records/actions/fetchRecordsApiSlice';
import { resetRecordsAndTotal, updateTotalExpensesIncomes } from '../../../../../redux/slices/Records/records.slice';
import { formatNumberToCurrency } from '../../../../../utils';

const ERROR_TITLE = 'Error.';
const ERROR_DESCRIPTION = 'Please try again later. If the error persists, contact support with the error code.';

const RecordList = () => {
  const dispatch = useAppDispatch();
  const {
    month, completeCurrentMonth, completeLastMonth, year, lastMonth,
  } = useDate();
  const user = useAppSelector((state) => state.user.userInfo);
  const recordsState = useAppSelector((state) => state.records);
  const { totalRecords } = recordsState;
  const bearerToken = user?.bearerToken as string;

  const selectedAccount = useAppSelector((state) => state.accounts.accountSelected);
  const accounts = useAppSelector((state) => state.accounts.accounts);
  const accountId = selectedAccount?._id ?? 'Account ID not found';

  const recordsRoute = `${GET_EXPENSES_AND_INCOMES_BY_MONTH_ROUTE}/${accountId}/${month}/${year}`;

  const {
    isLoading: isLoadingThisMonthRecs, isError: isErrorThisMonthRecs,
    currentData: responseFetchRecords, isSuccess: isSuccessThisMonthRecs,
  } = useFetchRecordsByMonthYearQuery({ route: recordsRoute, bearerToken });

  const [fetchLastMonthRecordsMutation, {
    isLoading: isLoadingLastMonthRecs, isError: isErrorLastMonthRecs, currentData: responseLastMonthRecs,
  }] = useLazyFetchRecordsByMonthYearQuery();

  const color = selectedAccount?.backgroundColorUI?.color ?? AppColors.black;

  useEffect(() => {
    if (isSuccessThisMonthRecs) {
      if (responseFetchRecords?.message === NO_EXPENSES_OR_INCOMES_FOUND) {
        dispatch(resetRecordsAndTotal());
        return;
      }

      let expenseTotalCounter = 0;
      let incomeTotalCounter = 0;
      responseFetchRecords?.records.forEach((record) => {
        if (record.isPaid !== undefined) {
          expenseTotalCounter += record.amount;
          return;
        }
        incomeTotalCounter += record.amount;
      });
      const expenseTotal = formatNumberToCurrency(expenseTotalCounter);
      const incomeTotal = formatNumberToCurrency(incomeTotalCounter);
      dispatch(updateTotalExpensesIncomes({ expenseTotalCounter: expenseTotal, incomeTotalCounter: incomeTotal }));
    }
  }, [dispatch, isSuccessThisMonthRecs, responseFetchRecords?.message, responseFetchRecords?.records]);

  const handleFetchLastMonthRecords = async () => {
    try {
      const recordsLastMonthRoute = `${GET_EXPENSES_AND_INCOMES_BY_MONTH_ROUTE}/${accountId}/${lastMonth}/${year}`;
      await fetchLastMonthRecordsMutation({ route: recordsLastMonthRoute, bearerToken }).unwrap();
    } catch (err) {
      console.error(`Error ocurred while fetching last month records: ${err}`);
    }
  };

  if (isLoadingThisMonthRecs) {
    return (
      <FlexContainer justifyContent="center" alignItems="center">
        <HorizontalLoader />
      </FlexContainer>
    );
  }

  if (!isLoadingThisMonthRecs && accounts && accounts.length === 0) {
    return (
      <NoAccountsFound />
    );
  }

  if ((responseFetchRecords && responseLastMonthRecs)
  && (responseFetchRecords.records.length === 0 && responseLastMonthRecs.records.length === 0)
  && (selectedAccount && !isLoadingLastMonthRecs)) {
    return (
      <NoRecordsFound />
    );
  }

  return (
    <List>
      <MonthRecords
        color={color}
        openedAccordeon
        titleMonthAccordeon={`Current month: ${completeCurrentMonth}`}
        totalExpense={totalRecords.currentMonth.expenseTotal}
        totalIncome={totalRecords.currentMonth.incomeTotal}
        accountId={accountId}
        records={responseFetchRecords?.records ?? []}
        loading={isLoadingThisMonthRecs}
        error={isErrorThisMonthRecs}
        onEmptyCb={() => <NoRecordsFoundOnMonth month={completeCurrentMonth} accountTitle={selectedAccount?.title ?? ''} />}
        onErrorCb={() => <Error hideIcon title={ERROR_TITLE} description={ERROR_DESCRIPTION} />}
        onLoadingCb={() => (
          <ShowMultipleRecordLoader numberOfSkeletons={3} keyMap="current-month" />
        )}
      />
      <MonthRecords
        color={color}
        openedAccordeon={false}
        titleMonthAccordeon={`Last month: ${completeLastMonth}`}
        totalExpense={totalRecords.lastMonth.expenseTotal}
        totalIncome={totalRecords.lastMonth.incomeTotal}
        onClickCb={handleFetchLastMonthRecords}
        accountId={accountId}
        records={responseLastMonthRecs?.records ?? []}
        loading={isLoadingLastMonthRecs}
        error={isErrorLastMonthRecs}
        onEmptyCb={() => <NoRecordsFoundOnMonth month={completeLastMonth} accountTitle={selectedAccount?.title ?? ''} />}
        onErrorCb={() => <Error hideIcon description="An error has ocurred. Please try again later." />}
        onLoadingCb={() => (
          <ShowMultipleRecordLoader numberOfSkeletons={3} keyMap="last-month" />
        )}
      />
    </List>
  );
};

export { RecordList };
