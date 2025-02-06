import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../tests/CustomWrapperRedux';
import { userInitialState } from '../../UI/Account/Account.mocks';
import { DeleteCategory } from './DeleteCategory';

describe('DeleteCategory', () => {
  const goBackAction = jest.fn();
  const updateError = jest.fn();
  const categoryToDelete = 'category-id-1';
  test('show delete and cancel button', () => {
    renderWithProviders(
      <DeleteCategory goBackAction={goBackAction} categoryToDelete={categoryToDelete} updateError={updateError} />,
      { preloadedState: { user: userInitialState } },
    );

    expect(screen.getByRole('button', { name: /eliminar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
  });
});
