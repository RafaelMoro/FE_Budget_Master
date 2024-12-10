/* eslint-disable react/no-unstable-nested-components */
import { useState } from 'react';
import { getDateInfo } from '../../../../../utils/DateUtils';
import { NO_EXPENSES_OR_INCOMES_FOUND } from '../../constants';
import { GET_EXPENSES_AND_INCOMES_BY_MONTH_ROUTE } from '../../../../../redux/constants';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { resetOlderRecordsBalance, updateTotalExpensesIncomes, useLazyFetchRecordsByMonthYearQuery } from '../../../../../redux/slices/Records';

import { MonthRecords } from '../MonthRecords';
import { NoRecordsFound } from '../NoRecordsFound';
import { Error } from '../../../Error';
import { ShowMultipleRecordLoader } from '../ShowMultipleRecordLoaders';
import { SelectMonthYear } from '../SelectExpenses/SelectMonthYear';
import { sumTotalRecords } from '../../../../../utils';
import { AbbreviatedMonthsType, AnyRecord, LazyFetchRecords } from '../../../../../globalInterface';
import { showMessageOnDate } from './OlderRecords.utils';
import { getOlderLocalRecords } from '../../../../../hooks/useAllExpenses/utils';

interface OlderRecordsProps {
  color: string;
  accountId: string;
  isGuestUser: boolean;
}

const OlderRecords = ({
  color, accountId, isGuestUser,
}: OlderRecordsProps) => {
  const dispatch = useAppDispatch();
  const {
    completeMonth, month, year, years,
  } = getDateInfo({ isOlderRecords: true });

  const [fetchOlderRecordsMutation, {
    isError, currentData, isFetching,
  }] = useLazyFetchRecordsByMonthYearQuery();

  const user = useAppSelector((state) => state.user.userInfo);
  const bearerToken = user?.bearerToken as string;
  // Local storage records
  const recordsLocalStorage = useAppSelector((state) => state.records.recordsLocalStorage);
  const recordsLocalStorageSelectedAccount = recordsLocalStorage?.find((record) => record.account === accountId);
  const [olderLocalRecords, setOlderLocalRecords] = useState<AnyRecord[]>([]);
  const olderRecords = isGuestUser ? olderLocalRecords : (currentData?.records ?? []);

  const recordsState = useAppSelector((state) => state.records);
  const { totalRecords: { olderRecords: olderRecordsTotal } } = recordsState;
  const [message, setMessage] = useState('');

  // Function executed in SelectMonthYear component
  const handleFetchRecords = async ({ newMonth, newYear, completeMonth: newCompleteMonth }: LazyFetchRecords) => {
    try {
      const monthParam: AbbreviatedMonthsType = newMonth ?? month;
      const yearParam = newYear ?? year;
      const completeMonthParam = newCompleteMonth ?? completeMonth;

      const newMessage = showMessageOnDate({ monthParam, yearParam, completeMonth: completeMonthParam });
      if (newMessage) {
        setMessage(newMessage);
        return;
      }

      // Reset message
      setMessage('');

      const olderRecordsRoute = `${GET_EXPENSES_AND_INCOMES_BY_MONTH_ROUTE}/${accountId}/${monthParam}/${yearParam}`;
      const response = await fetchOlderRecordsMutation({ route: olderRecordsRoute, bearerToken }).unwrap();
      // Update total balance of expenses and incomes after fetch of last month records
      if (response && response?.records) {
        const { records } = response;
        if (response?.message === NO_EXPENSES_OR_INCOMES_FOUND) {
          dispatch(resetOlderRecordsBalance());
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

  const getLocalRecords = ({ newMonth, newYear, completeMonth: newCompleteMonth }: LazyFetchRecords) => {
    const monthParam = newMonth ?? month;
    const yearParam = newYear ?? year;
    const completeMonthParam = newCompleteMonth ?? completeMonth;

    const newMessage = showMessageOnDate({ monthParam, yearParam, completeMonth: completeMonthParam });
    if (newMessage) {
      setMessage(newMessage);
      return;
    }

    // Reset message
    setMessage('');

    const fetchedLocalRecords = getOlderLocalRecords({
      month: monthParam,
      year: yearParam,
      recordsLocalStorageSelectedAccount,
    });
    setOlderLocalRecords(fetchedLocalRecords);
  };

  const fetchRecordsOnOpenAccordion = () => {
    if (isGuestUser) {
      const fetchedLocalRecords = getOlderLocalRecords({
        month,
        year,
        recordsLocalStorageSelectedAccount,
      });
      setOlderLocalRecords(fetchedLocalRecords);
      return;
    }
    handleFetchRecords({ newMonth: month, newYear: year });
  };

  const handleGetRecords = isGuestUser ? getLocalRecords : handleFetchRecords;

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
      loading={isGuestUser ? false : isFetching}
      error={isGuestUser ? false : isError}
      showMessage={message !== ''}
      onShowMessage={() => <Error description={message} minHeight="50rem" />}
      onEmptyCb={() => <NoRecordsFound />}
      onErrorCb={() => <Error description="An error has ocurred. Please try again later." />}
      onLoadingCb={() => (
        <ShowMultipleRecordLoader numberOfSkeletons={3} keyMap="older-records" />
      )}
      isOlderRecords
    >
      <SelectMonthYear
        completeMonth={completeMonth}
        currentYear={year}
        yearsArray={years}
        fetchRecordsCb={handleGetRecords}
        buttonText="Search records"
        isDashboard
      />
    </MonthRecords>
  );
};

export { OlderRecords };
