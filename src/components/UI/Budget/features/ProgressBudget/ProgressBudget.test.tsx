import { render, screen } from '@testing-library/react';
import { ProgressBudget } from './ProgressBudget';

describe('ProgressBudget', () => {
  test('Show ProgressBudget', () => {
    const progress = 20;
    const currentAmountFormatted = '$200.00';
    render(<ProgressBudget progress={progress} currentAmountFormatted={currentAmountFormatted} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByText('$200.00')).toBeInTheDocument();
    expect(screen.getByText('20%')).toBeInTheDocument();
  });
});
