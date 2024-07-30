import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { NoBudgetsCreatedForRecords } from './NoBudgetsCreatedForRecords';

describe('<NoBudgetsCreatedForRecords />', () => {
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
});
