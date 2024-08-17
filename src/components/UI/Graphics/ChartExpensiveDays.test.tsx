import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../tests/CustomWrapperRedux';
import { ChartExpensiveDays } from './ChartExpensiveDays';
import { recordsChart } from './Chart.mocks';

describe('ChartExpensiveDays chart component', () => {
  test('Show ChartExpensiveDays chart on mobile', () => {
    renderWithProviders(
      <ChartExpensiveDays records={recordsChart} />,
    );
    expect(screen.getByTestId('chart-bar-expensive-days-mobile')).toBeInTheDocument();
  });
});
