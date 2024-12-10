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

  test('Given no data, show message "Oops! It looks like there are no expenses to display right now."', () => {
    renderWithProviders(
      <ChartExpensiveDays records={[]} />,
    );
    expect(screen.getByText('Oops! It looks like there are no expenses to display right now.')).toBeInTheDocument();
    expect(screen.getByText('Add some expenses to start tracking your spending and see the data visualized here.')).toBeInTheDocument();
  });
});
