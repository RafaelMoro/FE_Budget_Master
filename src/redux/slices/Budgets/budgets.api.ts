import { BudgetsResponse } from '../../../components/UI/Budget/Budget.interface';
import { transformBudgetUI } from '../../../components/UI/Budget/Budget.util';
import { DELETE_METHOD, POST_METHOD, PUT_METHOD } from '../../../constants';
import { Budget, RequestBearerTokenProps } from '../../../globalInterface';
import { budgetMasterApi } from '../../budgetMaster.api';
import { BUDGETS_NOT_FOUND_MESSAGE, BUDGETS_TAG, BUDGETS_ROUTE_BE } from '../../constants';
import { CreateBudgetMutationProps, DeleteBudgetMutationProps } from './budgets.interface';

export const budgetsApiSlice = budgetMasterApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchBudgets: builder.query({
      query: ({ bearerToken }: RequestBearerTokenProps) => ({
        url: BUDGETS_ROUTE_BE,
        headers: {
          Authorization: bearerToken,
        },
      }),
      providesTags: [BUDGETS_TAG],
      transformResponse: (response: BudgetsResponse) => {
        if (!response.data && response.message === BUDGETS_NOT_FOUND_MESSAGE) return [];

        const budgets: Budget[] = response.data?.budgets;
        const transformedBudgets = transformBudgetUI({ budgets });
        return transformedBudgets;
      },
    }),

    createBudget: builder.mutation({
      query: ({ values, bearerToken }: CreateBudgetMutationProps) => ({
        url: BUDGETS_ROUTE_BE,
        method: POST_METHOD,
        body: values,
        headers: {
          Authorization: bearerToken,
        },
      }),
      invalidatesTags: [BUDGETS_TAG],
    }),

    editBudget: builder.mutation({
      query: ({ values, bearerToken }: CreateBudgetMutationProps) => ({
        url: BUDGETS_ROUTE_BE,
        method: PUT_METHOD,
        body: values,
        headers: {
          Authorization: bearerToken,
        },
      }),
      invalidatesTags: [BUDGETS_TAG],
    }),

    deleteBudget: builder.mutation({
      query: ({ values, bearerToken }: DeleteBudgetMutationProps) => ({
        url: BUDGETS_ROUTE_BE,
        method: DELETE_METHOD,
        body: values,
        headers: {
          Authorization: bearerToken,
        },
      }),
      invalidatesTags: [BUDGETS_TAG],
    }),
  }),
});

export const {
  useFetchBudgetsQuery, useLazyFetchBudgetsQuery, useCreateBudgetMutation, useDeleteBudgetMutation, useEditBudgetMutation,
} = budgetsApiSlice;
