import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../../tests/CustomWrapperRedux';
import { BudgetList } from './BudgetList';
import { getInitialUserInterfaceState, getUserMock } from '../../../../../tests/Global.mocks';
import { successfulResponseFetchBudgets, unsuccessfulResponseFetchBudgets } from '../../Budget.mocks';

describe('Budget List', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  test('Show budget list with loading skeleton', () => {
    const userMock = getUserMock({ isGuestUser: false });
    renderWithProviders(
      <BudgetList />,
      { preloadedState: { user: userMock } },
    );

    expect(screen.getByTestId('budget-loading-skeleton')).toBeInTheDocument();
  });

  test('Show budget list with two loading skeletons while being on not mobile', () => {
    const userMock = getUserMock({ isGuestUser: false });
    const userInterfaceMock = getInitialUserInterfaceState({ newWindowSize: 'Desktop' });
    renderWithProviders(
      <BudgetList />,
      { preloadedState: { user: userMock, userInterface: userInterfaceMock } },
    );

    const loadingSkeletons = screen.getAllByTestId('budget-loading-skeleton');
    expect(loadingSkeletons).toHaveLength(2);
  });

  test('Show budget list with data', async () => {
    fetchMock.once(JSON.stringify(successfulResponseFetchBudgets));
    const userMock = getUserMock({ isGuestUser: false });
    renderWithProviders(
      <BudgetList />,
      { preloadedState: { user: userMock } },
    );

    expect(await screen.findByText('Fast food and beverages.')).toBeInTheDocument();
    expect(screen.getByText('Limit: $1,000.00')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByText('$200.00')).toBeInTheDocument();
    expect(screen.getByText('20%')).toBeInTheDocument();
  });

  test('Show budget list with error message', async () => {
    fetchMock.mockRejectedValueOnce(JSON.stringify(unsuccessfulResponseFetchBudgets));
    const userMock = getUserMock({ isGuestUser: false });
    renderWithProviders(
      <BudgetList />,
      { preloadedState: { user: userMock } },
    );

    expect(await screen.findByText('Oops! Something went wrong. Try again later.')).toBeInTheDocument();
  });
});
