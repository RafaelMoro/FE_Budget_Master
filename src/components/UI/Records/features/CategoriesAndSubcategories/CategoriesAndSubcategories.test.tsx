import { screen, waitFor } from '@testing-library/react';
import { Formik } from 'formik';
import fetchMock from 'jest-fetch-mock';

import { renderWithProviders } from '../../../../../tests/CustomWrapperRedux';
import { CategoriesAndSubcategories } from './CategoriesAndSubcategories';
import { Category } from '../../../../../globalInterface';
import { TestCategorySchema } from '../../../../../validationsSchemas/records.schema';
import {
  categoriesInitialState, createCategoriesResponse, emptyCategoriesResponse, modifyCategoryState, successfulResponseFetchCategories, userInitialState,
} from '../../Record.mocks';

interface CreateCategoryValues {
  category: string;
  subCategory: string;
}

const WrapperCategoriesAndSubcategories = ({ categoryToBeEdited = null }: { categoryToBeEdited?: Category | null }) => {
  const initialValues: CreateCategoryValues = {
    category: categoryToBeEdited ? categoryToBeEdited._id : '',
    subCategory: categoryToBeEdited ? categoryToBeEdited.subCategories[0] : '',
  };
  const handleSubmit = jest.fn();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleSubmit(values)}
      validationSchema={TestCategorySchema}
      enableReinitialize
      validateOnMount
    >
      {({
        errors, touched,
      }) => (
        <CategoriesAndSubcategories
          errorCategory={errors.category}
          errorSubcategory={errors.subCategory}
          touchedCategory={touched.category}
          touchedSubCategory={touched.subCategory}
          categoryToBeEdited={categoryToBeEdited}
        />
      )}
    </Formik>
  );
};

describe('<CategoriesAndSubcategories />', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
    // Ignoring warning of mui of providing an out-of-range value into select category
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  test('Show loading status on category and subcategory', () => {
    renderWithProviders(
      <WrapperCategoriesAndSubcategories />,
    );

    expect(screen.getByText(/loading categories/i)).toBeInTheDocument();
    expect(screen.getByText(/loading subcategories/i)).toBeInTheDocument();
  });

  test('Show category and subcategory inputs', async () => {
    fetchMock.once(JSON.stringify(successfulResponseFetchCategories));
    renderWithProviders(
      <WrapperCategoriesAndSubcategories />,
      { preloadedState: { categories: categoriesInitialState, user: userInitialState } },
    );

    expect(await screen.findByText(/^category/i)).toBeInTheDocument();
    expect(screen.getByText(/subcategory/i)).toBeInTheDocument();
    const subCategoryContainer = screen.getByTestId('select-record-subcategory');
    const subCategoryInput = subCategoryContainer.querySelector('input');
    expect(subCategoryInput).toBeDisabled();
  });

  test('If the categories fetched are empty, create new ones automatically', async () => {
    fetchMock.mockResponse((request) => {
      if (request.url.includes('create-local-categories')) {
        return Promise.resolve(JSON.stringify(createCategoriesResponse));
      }
      return Promise.resolve(JSON.stringify(emptyCategoriesResponse));
    });
    renderWithProviders(
      <WrapperCategoriesAndSubcategories />,
      { preloadedState: { categories: categoriesInitialState, user: userInitialState } },
    );

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(3);
    });
  });

  test('Show category to be edited', async () => {
    fetchMock.once(JSON.stringify(successfulResponseFetchCategories));
    renderWithProviders(
      <WrapperCategoriesAndSubcategories categoryToBeEdited={successfulResponseFetchCategories.data.categories[1]} />,
      { preloadedState: { categories: modifyCategoryState, user: userInitialState } },
    );

    expect(await screen.findByText(/savings/i)).toBeInTheDocument();
  });
});
