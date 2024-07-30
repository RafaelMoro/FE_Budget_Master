import { render, screen, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import userEvent from '@testing-library/user-event';
import { NoBudgetsCreatedForRecords } from './NoBudgetsCreatedForRecords';
import { BUDGET_EDITOR_PAGE_ROUTE } from '../../../pages/RoutesConstants';

describe('<NoBudgetsCreatedForRecords />', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  const history = createMemoryHistory();
  test('Show No Budgets Created for Records', () => {
    render(
      <Router location={history.location} navigator={history}>
        <NoBudgetsCreatedForRecords />
      </Router>,
    );

    expect(screen.getByText(/you have not created your budgets yet\./i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create budget/i })).toBeInTheDocument();
  });

  test('Given a user, when he clicks on create budget, he is redirected to the budget editor page', async () => {
    render(
      <Router location={history.location} navigator={history}>
        <NoBudgetsCreatedForRecords />
      </Router>,
    );

    userEvent.click(screen.getByRole('button', { name: /create budget/i }));

    await waitFor(() => {
      expect(history.location.pathname).toBe(BUDGET_EDITOR_PAGE_ROUTE);
    });
  });
});
