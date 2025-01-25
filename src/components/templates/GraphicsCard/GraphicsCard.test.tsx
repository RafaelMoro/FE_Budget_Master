import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../tests/CustomWrapperRedux';
import { recordsChart } from '../../UI/Graphics/Chart.mocks';
import { GraphicsCard } from './GraphicsCard';

describe('GraphicsCard', () => {
  test('Show Graphics Card without data', () => {
    renderWithProviders(
      <GraphicsCard records={[]} />,
    );

    expect(screen.getByText('Estadísticas de tus finanzas')).toBeInTheDocument();
    expect(screen.getByText('No hay transacciones. Empieza a crear registros este mes para mostrar estadísticas.')).toBeInTheDocument();
  });

  test('Show Graphics Card with data', () => {
    renderWithProviders(
      <GraphicsCard records={recordsChart} />,
    );

    expect(screen.getByText('Estadísticas de tus finanzas')).toBeInTheDocument();
    expect(screen.getByTestId('chart-bar-expensive-days')).toBeInTheDocument();
    expect(screen.getByTestId('categories-chart')).toBeInTheDocument();
  });
});
