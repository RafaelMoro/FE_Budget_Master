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

  test('Given no data, show message "No data to display" on mobile', () => {
    renderWithProviders(
      <ChartExpensiveDays records={[]} />,
    );
    expect(screen.getByText('No data to display')).toBeInTheDocument();
  });

  test('Show ChartExpensiveDays chart on desktop', () => {
    const userInterfaceState = getInitialUserInterfaceState({ newWindowSize: 'Desktop' });
    renderWithProviders(
      <ChartExpensiveDays records={recordsChart} />,
      { preloadedState: { userInterface: userInterfaceState } },
    );

    expect(screen.getByTestId('chart-bar-expensive-days-desktop')).toBeInTheDocument();
  });

  test('Given no data, show message "No data to display" on desktop', () => {
    const userInterfaceState = getInitialUserInterfaceState({ newWindowSize: 'Desktop' });
    renderWithProviders(
      <ChartExpensiveDays records={[]} />,
      { preloadedState: { userInterface: userInterfaceState } },
    );
    expect(screen.getByText('No data to display')).toBeInTheDocument();
  });
});
