/* eslint-disable react/no-unstable-nested-components */
import { useGuestUser } from '../../../../../hooks';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { resetLastMonthBalance, updateTotalExpensesIncomes, useLazyFetchRecordsByMonthYearQuery } from '../../../../../redux/slices/Records';
import { getDateInfo, sumTotalRecords } from '../../../../../utils';
import { Error } from '../../../Error';
import { GET_EXPENSES_AND_INCOMES_BY_MONTH_ROUTE, NO_EXPENSES_OR_INCOMES_FOUND } from '../../constants';
import { MonthRecords } from '../MonthRecords';
import { NoRecordsFound } from '../NoRecordsFound';
import { ShowMultipleRecordLoader } from '../ShowMultipleRecordLoaders';

interface LastMonthRecordsProps {
  color: string;
  accountId: string;
  isGuestUser: boolean;
}

const LastMonthRecords = ({ color, accountId, isGuestUser }: LastMonthRecordsProps) => {
  const dispatch = useAppDispatch();
  const {
    completeLastMonth, year, lastMonth,
  } = getDateInfo();
  const { recordsLastMonthLocalStorage } = useGuestUser();
  const [fetchLastMonthRecordsMutation, {
    isFetching, isError, currentData,
  }] = useLazyFetchRecordsByMonthYearQuery();

  const user = useAppSelector((state) => state.user.userInfo);
  const bearerToken = user?.bearerToken as string;

  const recordsState = useAppSelector((state) => state.records);
  const { totalRecords } = recordsState;

  const handleFetchLastMonthRecords = async () => {
    try {
      if (isGuestUser) return;
      const recordsLastMonthRoute = `${GET_EXPENSES_AND_INCOMES_BY_MONTH_ROUTE}/${accountId}/${lastMonth}/${year}`;
      const response = await fetchLastMonthRecordsMutation({ route: recordsLastMonthRoute, bearerToken }).unwrap();
      // Update total balance of expenses and incomes after fetch of last month records
      if (response && response?.records) {
        const { records } = response;
        if (response?.message === NO_EXPENSES_OR_INCOMES_FOUND) {
          dispatch(resetLastMonthBalance());
          return;
        }
        const { expenseTotal, incomeTotal } = sumTotalRecords(records);
        dispatch(updateTotalExpensesIncomes({ expenseTotalCounter: expenseTotal, incomeTotalCounter: incomeTotal, period: 'LastMonth' }));
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`Error ocurred while fetching last month records: ${err}`);
    }
  };

  const lastMonthRecords = isGuestUser ? recordsLastMonthLocalStorage : (currentData?.records ?? []);

  return (
    <MonthRecords
      color={color}
      openedAccordeon={false}
      titleMonthAccordeon={`Last month: ${completeLastMonth}`}
      totalExpense={totalRecords.lastMonth.expenseTotal}
      totalIncome={totalRecords.lastMonth.incomeTotal}
      onClickCb={handleFetchLastMonthRecords}
      accountId={accountId}
      records={lastMonthRecords}
      isGuestUser={isGuestUser}
      loading={isGuestUser ? false : isFetching}
      error={isGuestUser ? false : isError}
      onEmptyCb={() => <NoRecordsFound />}
      onErrorCb={() => <Error hideIcon description="An error has ocurred. Please try again later." />}
      onLoadingCb={() => (
        <ShowMultipleRecordLoader numberOfSkeletons={3} keyMap="last-month" />
      )}
    />
  );
};

export { LastMonthRecords };
