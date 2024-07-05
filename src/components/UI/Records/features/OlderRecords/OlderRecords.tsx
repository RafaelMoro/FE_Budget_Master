/* eslint-disable react/no-unstable-nested-components */
import { useDate } from '../../../../../hooks/useDate';
import { GET_EXPENSES_AND_INCOMES_BY_MONTH_ROUTE, NO_EXPENSES_OR_INCOMES_FOUND } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { resetLastMonthBalance, updateTotalExpensesIncomes, useLazyFetchRecordsByMonthYearQuery } from '../../../../../redux/slices/Records';

import { MonthRecords } from '../MonthRecords';
import { NoRecordsFound } from '../NoRecordsFound';
import { Error } from '../../../Error';
import { ShowMultipleRecordLoader } from '../ShowMultipleRecordLoaders';
import { SelectMonthYear } from '../SelectExpenses/SelectMonthYear';
import { sumTotalRecords } from '../../../../../utils';
import { AnyRecord, LazyFetchRecords } from '../../../../../globalInterface';

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
    isError, currentData, isFetching,
  }] = useLazyFetchRecordsByMonthYearQuery();
  const user = useAppSelector((state) => state.user.userInfo);
  const bearerToken = user?.bearerToken as string;
  // change this
  const olderRecordsLocalStorage: AnyRecord[] = [];
  const olderRecords = isGuestUser ? olderRecordsLocalStorage : (currentData?.records ?? []);

  const recordsState = useAppSelector((state) => state.records);
  const { totalRecords: { olderRecords: olderRecordsTotal } } = recordsState;

  const handleFetchRecords = async ({ newMonth, newYear }: LazyFetchRecords) => {
    try {
      if (isGuestUser) return;
      const monthParam = newMonth ?? month;
      const yearParam = newYear ?? year;
      const olderRecordsRoute = `${GET_EXPENSES_AND_INCOMES_BY_MONTH_ROUTE}/${accountId}/${monthParam}/${yearParam}`;
      const response = await fetchOlderRecordsMutation({ route: olderRecordsRoute, bearerToken }).unwrap();
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

  const fetchRecordsOnOpenAccordion = () => {
    handleFetchRecords({ newMonth: month, newYear: year });
  };

  return (
    <MonthRecords
      color={color}
      openedAccordeon={false}
      onClickCb={fetchRecordsOnOpenAccordion}
      titleMonthAccordeon="Older Records"
      totalExpense={olderRecordsTotal.expenseTotal}
      totalIncome={olderRecordsTotal.incomeTotal}
      accountId={accountId}
      records={olderRecords}
      isGuestUser={isGuestUser}
      loading={isFetching}
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
        fetchRecordsCb={handleFetchRecords}
      />
    </MonthRecords>
  );
};

export { OlderRecords };
