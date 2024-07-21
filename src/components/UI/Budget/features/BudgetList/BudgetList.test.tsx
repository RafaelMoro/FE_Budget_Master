import { screen } from '@testing-library/react';
import { userLoggedMock } from '../../../../../mocks/global.mocks';
import { renderWithProviders } from '../../../../../tests/CustomWrapperRedux';
import { BudgetList } from './BudgetList';

describe('Budget List', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  test('Show budget list with loading skeleton', () => {
    renderWithProviders(
      <BudgetList />,
      { preloadedState: { user: userLoggedMock } },
    );

    expect(screen.getByTestId('budget-loading-skeleton')).toBeInTheDocument();
  });
});
