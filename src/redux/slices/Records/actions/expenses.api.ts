import { DELETE_METHOD, POST_METHOD, PUT_METHOD } from '../../../../constants';
import { budgetMasterApi } from '../../../budgetMaster.api';
import {
  RECORD_TAG, EXPENSE_ROUTE, UPDATE_MULTIPLE_EXPENSES, EXPENSE_TAG,
} from '../../../constants';
import { CreateExpenseMutationProps, DeleteExpenseMutationProps, GetExpensesResponse } from '../interface';

export const expensesApiSlice = budgetMasterApi.injectEndpoints({
  endpoints: (builder) => ({
    /** Query used to get all expenses to be related to an account */
    getExpenses: builder.query({
      query: ({ route, bearerToken }) => ({
        url: route,
        headers: {
          Authorization: bearerToken,
        },
      }),
      providesTags: [RECORD_TAG],
      transformResponse: (response: GetExpensesResponse) => {
        const { message, data } = response;
        const expenses = data?.expenses ?? null;
        return { expenses, message };
      },
    }),

    createExpense: builder.mutation({
      query: ({ values, bearerToken }: CreateExpenseMutationProps) => ({
        url: EXPENSE_ROUTE,
        method: POST_METHOD,
        body: values,
        headers: {
          Authorization: bearerToken,
        },
      }),
      invalidatesTags: [RECORD_TAG, EXPENSE_TAG],
    }),

    editExpense: builder.mutation({
      query: ({ values, bearerToken }) => ({
        url: EXPENSE_ROUTE,
        method: PUT_METHOD,
        body: values,
        headers: {
          Authorization: bearerToken,
        },
      }),
      invalidatesTags: [RECORD_TAG, EXPENSE_TAG],
    }),

    updatePaidMultipleExpenses: builder.mutation({
      query: ({ values, bearerToken }) => ({
        url: UPDATE_MULTIPLE_EXPENSES,
        method: PUT_METHOD,
        body: values,
        headers: {
          Authorization: bearerToken,
        },
      }),
    }),

    deleteExpense: builder.mutation({
      query: ({ values, bearerToken }: DeleteExpenseMutationProps) => ({
        url: EXPENSE_ROUTE,
        method: DELETE_METHOD,
        body: values,
        headers: {
          Authorization: bearerToken,
        },
      }),
      invalidatesTags: [RECORD_TAG, EXPENSE_TAG],
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useLazyGetExpensesQuery,
  useCreateExpenseMutation,
  useEditExpenseMutation,
  useUpdatePaidMultipleExpensesMutation,
  useDeleteExpenseMutation,
} = expensesApiSlice;
