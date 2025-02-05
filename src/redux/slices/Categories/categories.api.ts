import { CategoriesResponse } from '../../../components/UI/Records/interface';
import { PUT_METHOD } from '../../../constants';
import { RequestBearerTokenProps } from '../../../globalInterface';
import { budgetMasterApi } from '../../budgetMaster.api';
import { CATEGORIES_TAG, CATEGORIES_REST_ENDPOINT } from '../../constants';
import { ModifyAccountMutationProps } from '../Accounts/interface';

export const categoriesApiSlice = budgetMasterApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchCategories: builder.query({
      query: ({ bearerToken }: RequestBearerTokenProps) => ({
        url: CATEGORIES_REST_ENDPOINT,
        headers: {
          Authorization: bearerToken,
        },
      }),
      providesTags: [CATEGORIES_TAG],
      transformResponse: (response: CategoriesResponse) => response.data?.categories,
    }),

    editCategory: builder.mutation({
      query: ({ values, bearerToken }: ModifyAccountMutationProps) => ({
        url: CATEGORIES_REST_ENDPOINT,
        method: PUT_METHOD,
        body: values,
        headers: {
          Authorization: bearerToken,
        },
      }),
      invalidatesTags: [CATEGORIES_TAG],
    }),
  }),
});

export const { useFetchCategoriesQuery, useEditCategoryMutation } = categoriesApiSlice;
