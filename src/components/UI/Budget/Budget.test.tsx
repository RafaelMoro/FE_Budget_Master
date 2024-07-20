import { render, screen } from '@testing-library/react';
import { Budget } from './Budget';
import { getMockBudget } from './Budget.mocks';

describe('Budget', () => {
  test('Show Budget with title, description, limit, progress bar, amount and porcentage', () => {
    const mockBudget = getMockBudget();
    render(<Budget budget={mockBudget} />);

    expect(screen.getByText('Fast food and beverages.')).toBeInTheDocument();
    expect(screen.getByText('This budget is to control the amount of money spent in fast food')).toBeInTheDocument();
    expect(screen.getByText('Limit: $1,000.00')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByText('$200.00')).toBeInTheDocument();
    expect(screen.getByText('20%')).toBeInTheDocument();
  });

  test('Given a budget with large title and description, show budget with title and description truncated', () => {
    const mockBudget = getMockBudget({ hasLargeTitle: true, hasLargeDescription: true });
    render(<Budget budget={mockBudget} />);

    expect(screen.getByText('This is a very long title that should be truncated...')).toBeInTheDocument();
    // eslint-disable-next-line max-len
    expect(screen.getByText("This is a very long description that should be truncated on the budget when shown. Seems like it's still missing so...")).toBeInTheDocument();
  });
});
