import { render, screen } from '@testing-library/react';
import { BudgetDetailsDrawer } from './BudgetDetailsDrawer';
import { getMockBudget } from '../../Budget.mocks';

describe('BudgetDetailsDrawer', () => {
  test('Show Budget Details Drawer with a one time budget', () => {
    const toggleDrawer = jest.fn();
    const toggleDeleteModal = jest.fn();
    const mockBudget = getMockBudget();
    const dateText = `From ${mockBudget.startDateFormatted} to ${mockBudget.endDateFormatted}`;
    const progress = 20;

    render(
      <BudgetDetailsDrawer
        toggleDeleteModal={toggleDeleteModal}
        dateText={dateText}
        progress={progress}
        budget={mockBudget}
        toggleDrawer={toggleDrawer}
      />,
    );

    expect(screen.getByText(dateText)).toBeInTheDocument();
    expect(screen.getByText('Fast food and beverages.')).toBeInTheDocument();
    expect(screen.getByText('6 days left')).toBeInTheDocument();
    expect(screen.getByText(/limit/i)).toBeInTheDocument();
    expect(screen.getByText('20%')).toBeInTheDocument();
    expect(screen.getByText('$200.00')).toBeInTheDocument();
    expect(screen.getByText('This budget is to control the amount of money spent in fast food')).toBeInTheDocument();
    expect(screen.getByText('one-time')).toBeInTheDocument();
    expect(screen.getByText('weekly')).toBeInTheDocument();
  });

  test('Show Budget Details Drawer with a periodic budget', () => {
    const toggleDrawer = jest.fn();
    const toggleDeleteModal = jest.fn();
    const dateText = 'From Jul 10 to Jul 27';
    const progress = 20;
    const previousPeriods = ['2024-06-22T12:08:00 | 2024-07-06T12:08:00', '2024-07-06T12:08:00 | 2024-07-20T12:08:00'];
    const mockBudget = getMockBudget({ typeBudget: 'periodic', previousPeriods });

    render(
      <BudgetDetailsDrawer
        toggleDeleteModal={toggleDeleteModal}
        dateText={dateText}
        progress={progress}
        budget={mockBudget}
        toggleDrawer={toggleDrawer}
      />,
    );

    expect(screen.getByText('periodic')).toBeInTheDocument();
    expect(screen.getByText('Previous periods:')).toBeInTheDocument();
  });
});
