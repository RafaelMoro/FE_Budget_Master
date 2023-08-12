import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { AxiosRequestHeaders, AxiosError } from 'axios';

import { selectedAccountAtom, userAtom } from '../atoms';
import { GetRequest } from '../utils';
import { GET_EXPENSES } from '../components/UI/Records/constants';
import { Expense, ExpensePaid } from '../globalInterface';

interface UseAllExpensesProps {
  month: string;
  year: string;
}

interface GetExpensesNotPaidResponse {
  message: null | string;
  expenses: Expense[];
}

const useAllExpenses = ({ month, year }: UseAllExpensesProps) => {
  const [user] = useAtom(userAtom);
  const [selectedAccount] = useAtom(selectedAccountAtom);
  const selectedAccountId = selectedAccount?._id;
  const bearerToken = user?.bearerToken as AxiosRequestHeaders;

  const [noExpensesFound, setNoExpensesFound] = useState<boolean>(false);
  const [error, setError] = useState<string>('No error found');
  const [loading, setLoading] = useState<boolean>(true);
  const [expenses, setExpenses] = useState<ExpensePaid []>([]);

  useEffect(() => {
    const getExpenses = async () => {
      try {
        // set loading to true if it was false.
        setLoading(true);
        const fullRoute = `${GET_EXPENSES}/${selectedAccountId}/${month}/${year}`;
        const response: GetExpensesNotPaidResponse = await GetRequest(fullRoute, bearerToken);

        if (response.message === null) {
          // set it as false if it was previously true.
          setNoExpensesFound(false);
          // response returned the array of expenses
          const expensesShorted = response.expenses.map((expense) => {
            const {
              // eslint-disable-next-line @typescript-eslint/naming-convention
              _id, shortName, amount, fullDate, formattedTime, date,
            } = expense;
            const shortExpense: ExpensePaid = {
              _id, shortName, amount, fullDate, formattedTime, date,
            };
            return shortExpense;
          });
          setExpenses(expensesShorted);
          setLoading(false);
          return;
        }

        // The response returned = No expense found with that account id
        setNoExpensesFound(true);
        setLoading(false);
      } catch (errorCatched) {
        // catch error
        const newError = errorCatched as AxiosError;
        setError(newError.message);
        setLoading(false);
      }
    };
    if (!!user && bearerToken) getExpenses();
  }, [bearerToken, month, selectedAccountId, user, year]);

  return {
    expenses,
    noExpensesFound,
    error,
    loading,
  };
};

export { useAllExpenses };
