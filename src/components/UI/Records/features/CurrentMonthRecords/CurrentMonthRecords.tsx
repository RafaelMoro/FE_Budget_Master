/* eslint-disable react/no-unstable-nested-components */
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { resetTotalBalanceRecords, updateTotalExpensesIncomes, useFetchRecordsByMonthYearQuery } from '../../../../../redux/slices/Records';
import { getDateInfo, sumTotalRecords } from '../../../../../utils';
import { GET_EXPENSES_AND_INCOMES_BY_MONTH_ROUTE, NO_EXPENSES_OR_INCOMES_FOUND } from '../../constants';
import { MonthRecords } from '../MonthRecords';
import { NoRecordsFound } from '../NoRecordsFound';
import { ShowMultipleRecordLoader } from '../ShowMultipleRecordLoaders';
import { useGuestUser } from '../../../../../hooks';
import { Error } from '../../../Error';

interface CurrentMonthRecordsProps {
  color: string;
  accountId: string;
  isGuestUser: boolean;
}

const CurrentMonthRecords = ({
  color, accountId, isGuestUser,
}: CurrentMonthRecordsProps) => {
  const dispatch = useAppDispatch();
  const {
    month, completeCurrentMonth, year,
  } = getDateInfo();
  const recordsRoute = `${GET_EXPENSES_AND_INCOMES_BY_MONTH_ROUTE}/${accountId}/${month}/${year}`;
  const { recordsCurrentMonthLocalStorage } = useGuestUser();

  const user = useAppSelector((state) => state.user.userInfo);
  const bearerToken = user?.bearerToken as string;
  const recordsState = useAppSelector((state) => state.records);
  const { totalRecords } = recordsState;

  const {
    isError, isFetching, currentData, isSuccess,
  } = useFetchRecordsByMonthYearQuery({ route: recordsRoute, bearerToken }, { skip: (!bearerToken || !accountId || isGuestUser) });
  const currentRecords = isGuestUser ? recordsCurrentMonthLocalStorage : (currentData?.records ?? []);

  /** Update total balance of expenses and incomes after fetch of current month records */
  useEffect(() => {
    if (isSuccess && currentData?.records) {
      const { records } = currentData;
      if (currentData?.message === NO_EXPENSES_OR_INCOMES_FOUND) {
        dispatch(resetTotalBalanceRecords());
        return;
      }

      const { expenseTotal, incomeTotal } = sumTotalRecords(records);
      dispatch(updateTotalExpensesIncomes({ expenseTotalCounter: expenseTotal, incomeTotalCounter: incomeTotal, period: 'CurrentMonth' }));
    }
  }, [currentData, dispatch, isSuccess]);

  return (
    <MonthRecords
      color={color}
      openedAccordeon
      titleMonthAccordeon={`Current month: ${completeCurrentMonth}`}
      totalExpense={totalRecords.currentMonth.expenseTotal}
      totalIncome={totalRecords.currentMonth.incomeTotal}
      accountId={accountId}
      records={currentRecords}
      loading={isGuestUser ? false : isFetching}
      error={isGuestUser ? false : isError}
      isGuestUser={isGuestUser}
      onEmptyCb={() => <NoRecordsFound />}
      onErrorCb={() => <Error hideIcon description="An error has ocurred. Please try again later." />}
      onLoadingCb={() => (
        <ShowMultipleRecordLoader numberOfSkeletons={3} keyMap="current-month" />
      )}
    />
  );
};

export { CurrentMonthRecords };
