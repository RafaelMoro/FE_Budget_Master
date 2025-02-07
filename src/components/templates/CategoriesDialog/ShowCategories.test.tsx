import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// eslint-disable-next-line import/no-extraneous-dependencies
import fetchMock from 'jest-fetch-mock';

import { renderWithProviders } from '../../../tests/CustomWrapperRedux';
import { userInitialState } from '../../UI/Account/Account.mocks';
import { successfulResponseFetchCategories, failedResponseFetchCategories } from '../../UI/Records/Record.mocks';
import { ShowCategories } from './ShowCategories';

describe('<ShowCategories />', () => {
  const updateAction = jest.fn();
  const updateCategoryToDelete = jest.fn();
  const updateCategoryToEdit = jest.fn();
  const setActionCreate = jest.fn();

  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  test('Show loading categories state', () => {
    renderWithProviders(
      <ShowCategories
        setActionCreate={setActionCreate}
        updateAction={updateAction}
        updateCategoryToDelete={updateCategoryToDelete}
        updateCategoryToEdit={updateCategoryToEdit}
      />,
      { preloadedState: { user: userInitialState } },
    );

    expect(screen.getByText('Cargando categorías')).toBeInTheDocument();
  });

  test('Show categories and subcategories fetched', async () => {
    fetchMock.once(JSON.stringify(successfulResponseFetchCategories));
    renderWithProviders(
      <ShowCategories
        setActionCreate={setActionCreate}
        updateAction={updateAction}
        updateCategoryToDelete={updateCategoryToDelete}
        updateCategoryToEdit={updateCategoryToEdit}
      />,
      { preloadedState: { user: userInitialState } },
    );

    expect(await screen.findByText(/food and drink/i)).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /food and drink/i });
    await act(async () => userEvent.click(button));
    expect(await screen.findByText(/restaurants/i)).toBeInTheDocument();
  });

  test('Give the case where the fetch of categories failed, show error message', async () => {
    fetchMock.mockRejectedValueOnce(JSON.stringify(failedResponseFetchCategories));
    renderWithProviders(
      <ShowCategories
        setActionCreate={setActionCreate}
        updateAction={updateAction}
        updateCategoryToDelete={updateCategoryToDelete}
        updateCategoryToEdit={updateCategoryToEdit}
      />,
      { preloadedState: { user: userInitialState } },
    );

    expect(await screen.findByText(/error al cargar categorías/i)).toBeInTheDocument();
  });
});
