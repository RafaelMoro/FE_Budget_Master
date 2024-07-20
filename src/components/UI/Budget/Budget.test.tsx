import { render, screen } from '@testing-library/react';
import { Budget } from './Budget';
import { mockBudget } from './Budget.mocks';

describe('Budget', () => {
  test('Show Budget', () => {
    render(<Budget budget={mockBudget} />);

    expect(screen.getByText('Fast food and beverages.')).toBeInTheDocument();
    expect(screen.getByText('This budget is to control the amount of money spent in fast food')).toBeInTheDocument();
    expect(screen.getByText('Limit: $1,000.00')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByText('$200.00')).toBeInTheDocument();
    expect(screen.getByText('20%')).toBeInTheDocument();
  });
});
