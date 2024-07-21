import { BudgetsResponse } from '../../../components/UI/Budget/Budget.interface';
import { transformBudgetUI } from '../../../components/UI/Budget/Budget.util';
import { Budget, RequestBearerTokenProps } from '../../../globalInterface';
import { budgetMasterApi } from '../../budgetMaster.api';
import { BUDGETS_NOT_FOUND_MESSAGE, BUDGETS_TAG, GET_BUDGETS } from '../../constants';

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
      transformResponse: (response: BudgetsResponse) => {
        if (!response.data && response.message === BUDGETS_NOT_FOUND_MESSAGE) return [];

        const budgets: Budget[] = response.data?.budgets;
        const transformedBudgets = transformBudgetUI({ budgets });
        return transformedBudgets;
      },
    }),
  }),
});

export const { useFetchBudgetsQuery } = budgetsApiSlice;
