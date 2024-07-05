import { useEffect, useMemo, useState } from 'react';
import { GET_EXPENSES } from '../../components/UI/Records/constants';
import { UseAllExpensesProps } from './interface';
import { useAppSelector } from '../../redux/hooks';
import { useLazyGetExpensesQuery } from '../../redux/slices/Records/actions/expenses.api';
import { Expense, LazyFetchRecords } from '../../globalInterface';
import { useDate } from '../useDate';
import { getLocalRecords } from './utils';

const useAllExpenses = ({ month, year, accountId }: UseAllExpensesProps) => {
  const { month: currentMonth, lastMonth } = useDate();
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
      if (response?.message === 'No expenses found.') {
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

  useEffect(() => {
    if (isGuestUser && recordsLocalStorage) {
      const fetchedLocalRecords = getLocalRecords({
        month,
        lastMonth,
        currentMonth,
        year,
        recordsLocalStorageSelectedAccount,
        turnOnNoExpensesFound,
        turnOffNoExpensesFound,
        noExpensesFound,
      });
      setLocalRecords(fetchedLocalRecords);
    }
  }, [currentMonth, isGuestUser, lastMonth, month, noExpensesFound, recordsLocalStorage, recordsLocalStorageSelectedAccount, year]);

  // Be sure that there's not transfer records in the list
  const onlyExpensesIncomes = useMemo(
    () => (currentData?.records ?? []).filter((record) => record.typeOfRecord === 'expense'),
    [currentData?.records],
  );

  const recordsToShow = isGuestUser ? localRecords : onlyExpensesIncomes;

  return {
    expenses: recordsToShow,
    noExpensesFound,
    isError,
    loading: isFetching,
    handleFetchRecords,
  };
};

export { useAllExpenses };
