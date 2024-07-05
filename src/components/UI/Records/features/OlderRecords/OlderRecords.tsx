/* eslint-disable react/no-unstable-nested-components */
import { useDate } from '../../../../../hooks';
import { GET_EXPENSES_AND_INCOMES_BY_MONTH_ROUTE, NO_EXPENSES_OR_INCOMES_FOUND } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { resetLastMonthBalance, updateTotalExpensesIncomes, useLazyFetchRecordsByMonthYearQuery } from '../../../../../redux/slices/Records';

import { MonthRecords } from '../MonthRecords';
import { NoRecordsFound } from '../NoRecordsFound';
import { Error } from '../../../Error';
import { ShowMultipleRecordLoader } from '../ShowMultipleRecordLoaders';
import { SelectMonthYear } from '../SelectExpenses/SelectMonthYear';
import { sumTotalRecords } from '../../../../../utils';
import { AnyRecord } from '../../../../../globalInterface';

interface OlderRecordsProps {
  color: string;
  accountId: string;
  isGuestUser: boolean;
}

const OlderRecords = ({ color, accountId, isGuestUser }: OlderRecordsProps) => {
  const dispatch = useAppDispatch();
  const {
    completeMonth, month, year, years, updateMonthAndYear,
  } = useDate({ isOlderRecords: true });
  const [fetchOlderRecordsMutation, {
    isError, currentData, isLoading,
  }] = useLazyFetchRecordsByMonthYearQuery();
  const user = useAppSelector((state) => state.user.userInfo);
  const bearerToken = user?.bearerToken as string;
  // change this
  const olderRecordsLocalStorage: AnyRecord[] = [];
  const olderRecords = isGuestUser ? olderRecordsLocalStorage : (currentData?.records ?? []);

  const recordsState = useAppSelector((state) => state.records);
  const { totalRecords: { olderRecords: olderRecordsTotal } } = recordsState;

  const handleFetchRecords = async () => {
    try {
      if (isGuestUser) return;
      const recordsLastMonthRoute = `${GET_EXPENSES_AND_INCOMES_BY_MONTH_ROUTE}/${accountId}/${month}/${year}`;
      const response = await fetchOlderRecordsMutation({ route: recordsLastMonthRoute, bearerToken }).unwrap();
      // Update total balance of expenses and incomes after fetch of last month records
      if (response && response?.records) {
        const { records } = response;
        if (response?.message === NO_EXPENSES_OR_INCOMES_FOUND) {
          dispatch(resetLastMonthBalance());
          return;
        }
        const { expenseTotal, incomeTotal } = sumTotalRecords(records);
        // missing older records
        dispatch(updateTotalExpensesIncomes({ expenseTotalCounter: expenseTotal, incomeTotalCounter: incomeTotal, period: 'OlderRecords' }));
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`Error ocurred while fetching older records: ${err}`);
    }
  };

  return (
    <MonthRecords
      color={color}
      openedAccordeon={false}
      titleMonthAccordeon="Older Records"
      totalExpense={olderRecordsTotal.expenseTotal}
      totalIncome={olderRecordsTotal.incomeTotal}
      onClickCb={handleFetchRecords}
      accountId={accountId}
      records={olderRecords}
      isGuestUser={isGuestUser}
      loading={isLoading}
      error={isError}
      onEmptyCb={() => <NoRecordsFound />}
      onErrorCb={() => <Error hideIcon description="An error has ocurred. Please try again later." />}
      onLoadingCb={() => (
        <ShowMultipleRecordLoader numberOfSkeletons={3} keyMap="older-records" />
      )}
      isOlderRecords
    >
      <SelectMonthYear
        updateMonthYear={updateMonthAndYear}
        completeMonth={completeMonth}
        currentYear={year}
        yearsArray={years}
      />
    </MonthRecords>
  );
};

export { OlderRecords };
