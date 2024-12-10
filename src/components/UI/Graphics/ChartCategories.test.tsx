import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../tests/CustomWrapperRedux';
import { recordsChart } from './Chart.mocks';
import { ChartCategories } from './ChartCategories';

describe('ChartCategories chart component', () => {
  test('Show ChartCategories chart', () => {
    renderWithProviders(
      <ChartCategories records={recordsChart} />,
    );

    expect(screen.getByTestId('categories-chart')).toBeInTheDocument();
  });

  test('Given no data, show message "No data to display"', () => {
    renderWithProviders(
      <ChartCategories records={[]} />,
    );

    expect(screen.getByText('No data to display')).toBeInTheDocument();
  });
});
