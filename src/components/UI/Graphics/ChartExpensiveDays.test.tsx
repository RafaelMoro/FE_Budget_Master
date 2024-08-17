import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../tests/CustomWrapperRedux';
import { ChartExpensiveDays } from './ChartExpensiveDays';
import { recordsChart } from './Chart.mocks';
import { getInitialUserInterfaceState } from '../../../tests/Global.mocks';

describe('ChartExpensiveDays chart component', () => {
  test('Show ChartExpensiveDays chart on mobile', () => {
    renderWithProviders(
      <ChartExpensiveDays records={recordsChart} />,
    );
    expect(screen.getByTestId('chart-bar-expensive-days-mobile')).toBeInTheDocument();
  });

  test('Show ChartExpensiveDays chart on desktop', () => {
    const userInterfaceState = getInitialUserInterfaceState({ newWindowSize: 'Desktop' });
    renderWithProviders(
      <ChartExpensiveDays records={recordsChart} />,
      { preloadedState: { userInterface: userInterfaceState } },
    );

    expect(screen.getByTestId('chart-bar-expensive-days-desktop')).toBeInTheDocument();
  });
});
