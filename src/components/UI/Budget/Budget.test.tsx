import { screen } from '@testing-library/react';
import { Budget } from './Budget';
import { getMockBudget } from './Budget.mocks';
import { renderWithProviders } from '../../../tests/CustomWrapperRedux';

describe('Budget', () => {
  test('Show Budget with title, description, limit, progress bar, amount and porcentage', () => {
    const mockBudget = getMockBudget();
    renderWithProviders(<Budget budget={mockBudget} />);

    expect(screen.getByText('Fast food and beverages.')).toBeInTheDocument();
    expect(screen.getByText('Limit: $1,000.00')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByText('$200.00')).toBeInTheDocument();
    expect(screen.getByText('20%')).toBeInTheDocument();
  });

  test('Given a budget with large title and description, show budget with title truncated', () => {
    const mockBudget = getMockBudget({ hasLargeTitle: true, hasLargeDescription: true });
    renderWithProviders(<Budget budget={mockBudget} />);

    expect(screen.getByText('This is a very long title that should be truncated...')).toBeInTheDocument();
  });
});
