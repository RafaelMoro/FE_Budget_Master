import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../tests/CustomWrapperRedux';
import { recordsChart } from '../../UI/Graphics/Chart.mocks';
import { GraphicsCard } from './GraphicsCard';

describe('GraphicsCard', () => {
  test('Show Graphics Card with data', () => {
    renderWithProviders(
      <GraphicsCard records={recordsChart} />,
    );

    expect(screen.getByText('Useful statistics of your finances')).toBeInTheDocument();
    expect(screen.getByTestId('chart-bar-expensive-days')).toBeInTheDocument();
    expect(screen.getByTestId('categories-chart')).toBeInTheDocument();
  });
});
