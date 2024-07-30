import { POST_METHOD, PUT_METHOD } from '../../../../constants';
import { budgetMasterApi } from '../../../budgetMaster.api';
import { RECORD_TAG, INCOME_ROUTE, ACCOUNT_TAG } from '../../../constants';

export const incomesApiSlice = budgetMasterApi.injectEndpoints({
  endpoints: (builder) => ({
    createIncome: builder.mutation({
      query: ({ values, bearerToken }) => ({
        url: INCOME_ROUTE,
        method: POST_METHOD,
        body: values,
        headers: {
          Authorization: bearerToken,
        },
      }),
      invalidatesTags: [RECORD_TAG, ACCOUNT_TAG],
    }),

    editIncome: builder.mutation({
      query: ({ values, bearerToken }) => ({
        url: INCOME_ROUTE,
        method: PUT_METHOD,
        body: values,
        headers: {
          Authorization: bearerToken,
        },
      }),
      invalidatesTags: [RECORD_TAG, ACCOUNT_TAG],
    }),
  }),
});

export const { useCreateIncomeMutation, useEditIncomeMutation } = incomesApiSlice;
