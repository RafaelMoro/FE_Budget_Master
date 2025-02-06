import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// eslint-disable-next-line import/no-extraneous-dependencies
import fetchMock from 'jest-fetch-mock';

import { renderWithProviders } from '../../../tests/CustomWrapperRedux';
import { userInitialState } from '../../UI/Account/Account.mocks';
import { DeleteCategory } from './DeleteCategory';
import { successfulDeleteCategoriesResponse } from '../../UI/Records/Record.mocks';

describe('DeleteCategory', () => {
  const goBackAction = jest.fn();
  const updateError = jest.fn();
  const categoryToDelete = 'category-id-1';

  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
  });

  test('show delete and cancel button', () => {
    renderWithProviders(
      <DeleteCategory goBackAction={goBackAction} categoryToDelete={categoryToDelete} updateError={updateError} />,
      { preloadedState: { user: userInitialState } },
    );

    expect(screen.getByRole('button', { name: /eliminar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
  });

  test('Given a user clicking on delete button, show tick icon inside the delete button', async () => {
    fetchMock.once(JSON.stringify(successfulDeleteCategoriesResponse));
    renderWithProviders(
      <DeleteCategory goBackAction={goBackAction} categoryToDelete={categoryToDelete} updateError={updateError} />,
      { preloadedState: { user: userInitialState } },
    );

    const deleteButton = screen.getByRole('button', { name: /eliminar/i });
    await act(async () => userEvent.click(deleteButton));
    expect(await screen.findByTestId('DoneOutlinedIcon')).toBeInTheDocument();
  });
});
