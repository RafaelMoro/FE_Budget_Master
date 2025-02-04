import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../tests/CustomWrapperRedux';
import { userInitialState } from '../../UI/Account/Account.mocks';
import { ShowCategories } from './ShowCategories';

describe('<ShowCategories />', () => {
  test('Show loading categories state', () => {
    const updateAction = jest.fn();
    const updateCategoryToDelete = jest.fn();
    const updateCategoryToEdit = jest.fn();

    renderWithProviders(
      <ShowCategories updateAction={updateAction} updateCategoryToDelete={updateCategoryToDelete} updateCategoryToEdit={updateCategoryToEdit} />,
      { preloadedState: { user: userInitialState } },
    );

    expect(screen.getByText('Cargando categorías')).toBeInTheDocument();
  });
});
