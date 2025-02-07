import { screen } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import fetchMock from 'jest-fetch-mock';
import { renderWithProviders } from '../../../tests/CustomWrapperRedux';
import { CategoriesDialog } from './CategoriesDialog';
import { userInitialState } from '../../UI/Account/Account.mocks';
import { ERROR_MESSAGE_FETCH_CATEGORY, ERROR_MESSAGE_GENERAL } from '../../../constants';
import { failedResponseFetchCategories } from '../../UI/Records/Record.mocks';

describe('<CategoriesDialog />', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
  });

  test('Show title and description', () => {
    renderWithProviders(
      <CategoriesDialog onClose={onClose} open />,
      { preloadedState: { user: userInitialState } },
    );

    expect(screen.getByRole('heading', { name: /categorías/i })).toBeInTheDocument();
    // eslint-disable-next-line max-len
    const description = 'Haga click en cualquier categoría para ver sus subcategorías. Dentro encontrará los botones para editar o eliminar esa categoría.';
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  test('Given an error while fetching categories, show error message', async () => {
    fetchMock.mockRejectedValueOnce(JSON.stringify(failedResponseFetchCategories));
    renderWithProviders(
      <CategoriesDialog onClose={onClose} open />,
      { preloadedState: { user: userInitialState } },
    );

    expect(await screen.findByText(ERROR_MESSAGE_FETCH_CATEGORY)).toBeInTheDocument();
    expect(screen.getByText(ERROR_MESSAGE_GENERAL)).toBeInTheDocument();
  });
});
