import { TRANSFER_ROUTE } from '../../../../components/UI/Records/constants';
import { IncomeAndExpensesResponse } from '../../../../components/UI/Records/interface';
import { DELETE_METHOD, POST_METHOD } from '../../../../constants';
import { budgetMasterApi } from '../../../budgetMaster.api';
import { RECORD_TAG } from '../../../constants';
import { CreateTransferMutationProps, DeleteRecordMutationProps, GetRecordByMonthAndYearProps } from '../interface';

export const recordsApiSlice = budgetMasterApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchRecordsByMonthYear: builder.query({
      query: ({ route, bearerToken }: GetRecordByMonthAndYearProps) => ({
        url: route,
        headers: {
          Authorization: bearerToken,
        },
      }),
      providesTags: [RECORD_TAG],
      transformResponse: (response: IncomeAndExpensesResponse) => {
        const data = response?.data;
        const message = response?.message;
        // records could be null, setting an empty array if it's null
        const records = data?.records ?? [];
        return { records, message };
      },
    }),
    deleteRecord: builder.mutation({
      query: ({ values, route, bearerToken }: DeleteRecordMutationProps) => ({
        url: route,
        method: DELETE_METHOD,
        body: values,
        headers: {
          Authorization: bearerToken,
        },
      }),
      invalidatesTags: [RECORD_TAG],
    }),
    createTransfer: builder.mutation({
      query: ({ values, bearerToken }: CreateTransferMutationProps) => ({
        url: TRANSFER_ROUTE,
        method: POST_METHOD,
        body: values,
        headers: {
          Authorization: bearerToken,
        },
      }),
      invalidatesTags: [RECORD_TAG],
    }),
  }),
});

export const {
  useFetchRecordsByMonthYearQuery, useLazyFetchRecordsByMonthYearQuery,
  useDeleteRecordMutation, useCreateTransferMutation,
} = recordsApiSlice;
