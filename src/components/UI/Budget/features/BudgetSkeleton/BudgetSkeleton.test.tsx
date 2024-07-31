import { render, screen } from '@testing-library/react';
import { BudgetSkeleton } from './BudgetSkeleton';

describe('<BudgetSkeleton />', () => {
  test('Show Budget Skeleton', () => {
    render(<BudgetSkeleton />);

    expect(screen.getByTestId('budget-loading-skeleton')).toBeInTheDocument();
  });
});
