import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../tests/CustomWrapperRedux';
import { ChartExpensiveDays } from './ChartExpensiveDays';
import { recordsChart } from './Chart.mocks';

describe('ChartExpensiveDays chart component', () => {
  test('Show ChartExpensiveDays chart', () => {
    renderWithProviders(
      <ChartExpensiveDays records={recordsChart} />,
    );
    expect(screen.getByTestId('chart-bar-expensive-days')).toBeInTheDocument();
  });

  test('Given no data, show message "No data to display"', () => {
    renderWithProviders(
      <ChartExpensiveDays records={[]} />,
    );
    expect(screen.getByText('No data to display')).toBeInTheDocument();
  });
});
