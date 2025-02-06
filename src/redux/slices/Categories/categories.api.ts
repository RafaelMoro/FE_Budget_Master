import { DeleteCategoryMutationProps, ModifyCategoryMutationProps } from '../../../components/templates/CategoriesDialog/CategoryDialog.interface';
import { CategoriesResponse } from '../../../components/UI/Records/interface';
import { DELETE_METHOD, PUT_METHOD } from '../../../constants';
import { RequestBearerTokenProps } from '../../../globalInterface';
import { budgetMasterApi } from '../../budgetMaster.api';
import { CATEGORIES_TAG, CATEGORIES_REST_ENDPOINT } from '../../constants';

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
      query: ({ values, bearerToken }: ModifyCategoryMutationProps) => ({
        url: CATEGORIES_REST_ENDPOINT,
        method: PUT_METHOD,
        body: values,
        headers: {
          Authorization: bearerToken,
        },
      }),
      invalidatesTags: [CATEGORIES_TAG],
    }),

    deleteCategory: builder.mutation({
      query: ({ values, bearerToken }: DeleteCategoryMutationProps) => ({
        url: CATEGORIES_REST_ENDPOINT,
        method: DELETE_METHOD,
        body: values,
        headers: {
          Authorization: bearerToken,
        },
      }),
      invalidatesTags: [CATEGORIES_TAG],
    }),
  }),
});

export const { useFetchCategoriesQuery, useEditCategoryMutation, useDeleteCategoryMutation } = categoriesApiSlice;
