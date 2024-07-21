import { render, screen } from '@testing-library/react';
import { BudgetDetailsDrawer } from './BudgetDetailsDrawer';
import { getMockBudget } from '../../Budget.mocks';

describe('BudgetDetailsDrawer', () => {
  test('Show Budget Details Drawer with a one time budget', () => {
    const toggleDrawer = jest.fn();
    const mockBudget = getMockBudget();
    const dateText = 'From Jul 10 to Jul 27';
    const progress = 20;
    render(<BudgetDetailsDrawer dateText={dateText} progress={progress} budget={mockBudget} toggleDrawer={toggleDrawer} />);

    expect(screen.getByText(dateText)).toBeInTheDocument();
    expect(screen.getByText('Fast food and beverages.')).toBeInTheDocument();
    expect(screen.getByText(/limit/i)).toBeInTheDocument();
    expect(screen.getByText('20%')).toBeInTheDocument();
    expect(screen.getByText('$200.00')).toBeInTheDocument();
    expect(screen.getByText('This budget is to control the amount of money spent in fast food')).toBeInTheDocument();
    expect(screen.getByText('one-time')).toBeInTheDocument();
    expect(screen.getByText('weekly')).toBeInTheDocument();
  });
});
