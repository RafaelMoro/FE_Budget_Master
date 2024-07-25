import { screen, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import fetchMock from 'jest-fetch-mock';

import userEvent from '@testing-library/user-event';
import { DeleteBudgetModal } from './DeleteBudgetModal';
import { getMockBudget, successfulResponseDeleteBudget } from '../../Budget.mocks';
import { renderWithProviders } from '../../../../../tests/CustomWrapperRedux';

describe('DeleteBudgetModal', () => {
  const onCloseFn = jest.fn();
  const budget = getMockBudget();
  const history = createMemoryHistory();
  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});

    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <DeleteBudgetModal
          open
          onClose={onCloseFn}
          budget={budget}
        />
      </Router>,
    );
  });
  test('Show the delete budget modal', () => {
    expect(screen.getByText(/Are you sure that you want to delete the budget:/i)).toBeInTheDocument();
    expect(screen.getByText(/you cannot reverse this action\./i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  test('Given a user clicks on the delete button, the budget should be deleted', async () => {
    fetchMock.once(JSON.stringify(successfulResponseDeleteBudget));

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    userEvent.click(deleteButton);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });
  });

  test('Given a user clicks on the cancel button, the modal should be closed', async () => {
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    userEvent.click(cancelButton);

    expect(onCloseFn).toHaveBeenCalled();
  });
});
