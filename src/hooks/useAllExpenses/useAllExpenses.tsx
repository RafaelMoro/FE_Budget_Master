import { useMemo, useState } from 'react';
import { GET_EXPENSES } from '../../redux/constants';
import { UseAllExpensesProps } from './interface';
import { useAppSelector } from '../../redux/hooks';
import { useLazyGetExpensesQuery } from '../../redux/slices/Records/actions/expenses.api';
import { Expense, LazyFetchRecords } from '../../globalInterface';
import { getDateInfo } from '../../utils/DateUtils';
import { getLocalRecords } from './utils';
import { EXPENSES_NOT_FOUND } from '../../constants';

const useAllExpenses = ({ month, year, accountId }: UseAllExpensesProps) => {
  const { month: currentMonth, lastMonth } = getDateInfo();
  const userReduxState = useAppSelector((state) => state.user);
  const isGuestUser: boolean = userReduxState?.userInfo?.user?.firstName === 'Guest';
  const recordsLocalStorage = useAppSelector((state) => state.records.recordsLocalStorage);
  const bearerToken = userReduxState.userInfo?.bearerToken as string;
  const selectedAccount = useAppSelector((state) => state.accounts.accountSelected);
  const selectedAccountId = accountId ?? selectedAccount?._id;
  const recordsLocalStorageSelectedAccount = recordsLocalStorage?.find((record) => record.account === selectedAccountId);

  const [fetchOlderRecordsMutation, {
    isError, currentData, isFetching,
  }] = useLazyGetExpensesQuery();

  const [localRecords, setLocalRecords] = useState<Expense[]>([]);
  const [noExpensesFound, setNoExpensesFound] = useState<boolean>(false);

  const turnOnNoExpensesFound = () => setNoExpensesFound(true);
  const turnOffNoExpensesFound = () => setNoExpensesFound(false);

  const handleFetchRecords = async ({ newMonth, newYear }: LazyFetchRecords) => {
    try {
      if (!bearerToken || !selectedAccountId || isGuestUser) return;

      const monthParam = newMonth ?? month;
      const yearParam = newYear ?? year;
      const olderRecordsRoute = `${GET_EXPENSES}/${selectedAccountId}/${monthParam}/${yearParam}`;
      const response = await fetchOlderRecordsMutation({ route: olderRecordsRoute, bearerToken }).unwrap();

      // Update total balance of expenses and incomes after fetch of last month records
      if (response?.message === EXPENSES_NOT_FOUND) {
        turnOnNoExpensesFound();
      }
      if (!response?.message) {
        turnOffNoExpensesFound();
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`Error ocurred while fetching related expenses: ${err}`);
    }
  };

  const handleGetLocalRecords = ({ newMonth, newYear }: LazyFetchRecords) => {
    const monthParam = newMonth ?? month;
    const yearParam = newYear ?? year;
    const fetchedLocalRecords = getLocalRecords({
      month: monthParam,
      lastMonth,
      currentMonth,
      year: yearParam,
      recordsLocalStorageSelectedAccount,
      turnOnNoExpensesFound,
      turnOffNoExpensesFound,
      noExpensesFound,
    });
    setLocalRecords(fetchedLocalRecords);
  };
  const handleGetRecords = isGuestUser ? handleGetLocalRecords : handleFetchRecords;

  // Be sure that there's not transfer records in the list
  const onlyExpensesIncomes = useMemo(
    () => (currentData?.expenses ?? []).filter((record) => record.typeOfRecord === 'expense'),
    [currentData?.expenses],
  );

  const recordsToShow = isGuestUser ? localRecords : onlyExpensesIncomes;

  return {
    expenses: recordsToShow,
    noExpensesFound,
    isError,
    loading: isFetching,
    handleFetchRecords: handleGetRecords,
  };
};

export { useAllExpenses };
