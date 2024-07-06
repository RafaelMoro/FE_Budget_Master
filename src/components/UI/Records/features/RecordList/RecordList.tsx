/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-console */
import { useEffect } from 'react';

import { Error } from '../../../Error';
import { LoadingStatus } from '../LoadingStatus';
import { ShowMultipleRecordLoader } from '../ShowMultipleRecordLoaders';
import { MonthRecords } from '../MonthRecords';
import { NoRecordsFound } from '../NoRecordsFound';
import { NoAccountsFound } from '../../../Account/features/NoAccountsFound';

import { sumTotalRecords } from '../../../../../utils';
import {
  GET_EXPENSES_AND_INCOMES_BY_MONTH_ROUTE, NO_EXPENSES_OR_INCOMES_FOUND,
} from '../../constants';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { getDateInfo } from '../../../../../utils/DateUtils';
import { useGuestUser } from '../../../../../hooks/useGuestUser/useGuestUser';
import {
  useFetchRecordsByMonthYearQuery,
  resetTotalBalanceRecords,
  updateTotalExpensesIncomes,
} from '../../../../../redux/slices/Records';
import { AppColors } from '../../../../../styles';
import { List } from '../../Records.styled';
import { OlderRecords } from '../OlderRecords';
import { LastMonthRecords } from '../LastMonthRecords';

const ERROR_TITLE = 'Error.';
const ERROR_DESCRIPTION = 'Please try again later. If the error persists, contact support with the error code.';

interface RecordListProps {
  handleOpenCreateAccount: () => void;
}

const RecordList = ({ handleOpenCreateAccount }: RecordListProps) => {
  const dispatch = useAppDispatch();
  const {
    month, completeCurrentMonth, year,
  } = getDateInfo();
  const { isGuestUser, recordsCurrentMonthLocalStorage } = useGuestUser();
  const user = useAppSelector((state) => state.user.userInfo);
  const accountsFetchStatus = useAppSelector((state) => state.accounts.accountsFetchStatus);
  const recordsState = useAppSelector((state) => state.records);
  const { totalRecords } = recordsState;
  const bearerToken = user?.bearerToken as string;

  const selectedAccount = useAppSelector((state) => state.accounts.accountSelected);
  const accounts = useAppSelector((state) => state.accounts.accounts);
  const accountId = selectedAccount?._id ?? '';

  const recordsRoute = `${GET_EXPENSES_AND_INCOMES_BY_MONTH_ROUTE}/${accountId}/${month}/${year}`;

  const {
    isError: isErrorThisMonthRecs, isFetching: isFetchingThisMonthRecs,
    currentData: responseFetchRecords, isSuccess: isSuccessThisMonthRecs,
  } = useFetchRecordsByMonthYearQuery({ route: recordsRoute, bearerToken }, { skip: (!bearerToken || !accountId || isGuestUser) });

  const color = selectedAccount?.backgroundColorUI?.color ?? AppColors.black;
  const currentRecords = isGuestUser ? recordsCurrentMonthLocalStorage : (responseFetchRecords?.records ?? []);

  /** Update total balance of expenses and incomes after fetch of current month records */
  useEffect(() => {
    if (isSuccessThisMonthRecs && responseFetchRecords?.records) {
      const { records } = responseFetchRecords;
      if (responseFetchRecords?.message === NO_EXPENSES_OR_INCOMES_FOUND) {
        dispatch(resetTotalBalanceRecords());
        return;
      }

      const { expenseTotal, incomeTotal } = sumTotalRecords(records);
      dispatch(updateTotalExpensesIncomes({ expenseTotalCounter: expenseTotal, incomeTotalCounter: incomeTotal, period: 'CurrentMonth' }));
    }
  }, [dispatch, isSuccessThisMonthRecs, responseFetchRecords, responseFetchRecords?.message, responseFetchRecords?.records]);

  if (accountsFetchStatus === 'isUninitialized' && !isGuestUser) {
    return (
      <LoadingStatus text="Waiting on the load of accounts..." />
    );
  }

  if (accountsFetchStatus === 'loading') {
    return (
      <LoadingStatus text="Loading accounts...." />
    );
  }

  if (!isFetchingThisMonthRecs && accounts && accounts.length === 0) {
    return (
      <NoAccountsFound handleOpenCreateAccount={handleOpenCreateAccount} />
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
        records={currentRecords}
        loading={isGuestUser ? false : isFetchingThisMonthRecs}
        error={isGuestUser ? false : isErrorThisMonthRecs}
        isGuestUser={isGuestUser}
        onEmptyCb={() => <NoRecordsFound />}
        onErrorCb={() => <Error hideIcon title={ERROR_TITLE} description={ERROR_DESCRIPTION} />}
        onLoadingCb={() => (
          <ShowMultipleRecordLoader numberOfSkeletons={3} keyMap="current-month" />
        )}
      />
      <LastMonthRecords
        color={color}
        accountId={accountId}
        isGuestUser={isGuestUser}
      />
      <OlderRecords
        color={color}
        accountId={accountId}
        isGuestUser={isGuestUser}
      />
    </List>
  );
};

export { RecordList };
