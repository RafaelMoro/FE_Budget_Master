import { BudgetsResponse } from '../../../components/UI/Budget/Budget.interface';
import { RequestBearerTokenProps } from '../../../globalInterface';
import { budgetMasterApi } from '../../budgetMaster.api';
import { BUDGETS_TAG, GET_BUDGETS } from '../../constants';

export const budgetsApiSlice = budgetMasterApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchBudgets: builder.query({
      query: ({ bearerToken }: RequestBearerTokenProps) => ({
        url: GET_BUDGETS,
        headers: {
          Authorization: bearerToken,
        },
      }),
      providesTags: [BUDGETS_TAG],
      transformResponse: (response: BudgetsResponse) => response.data?.budgets,
    }),
  }),
});

export const { useFetchBudgetsQuery } = budgetsApiSlice;
