import { screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { DeleteBudgetModal } from './DeleteBudgetModal';
import { getMockBudget } from '../../Budget.mocks';
import { renderWithProviders } from '../../../../../tests/CustomWrapperRedux';

describe('DeleteBudgetModal', () => {
  const history = createMemoryHistory();
  test('Show the delete budget modal', () => {
    const onCloseFn = jest.fn();
    const budget = getMockBudget();
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <DeleteBudgetModal
          open
          onClose={onCloseFn}
          budget={budget}
        />
      </Router>,
    );

    expect(screen.getByText(/Are you sure that you want to delete the budget:/i)).toBeInTheDocument();
    expect(screen.getByText(/you cannot reverse this action\./i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });
});
