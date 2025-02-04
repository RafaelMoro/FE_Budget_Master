import { screen } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import fetchMock from 'jest-fetch-mock';
import { renderWithProviders } from '../../../tests/CustomWrapperRedux';
import { CategoriesDialog } from './CategoriesDialog';
import { userInitialState } from '../../UI/Account/Account.mocks';

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
});
