import { render, screen } from '@testing-library/react';
import { TestChart } from './TestChart';

describe('TestChart', () => {
  test('Show test chart', () => {
    render(<TestChart />);

    expect(screen.getByTestId('test-chart-something')).toBeInTheDocument();
  });
});
