import { render, screen } from '@testing-library/react';
import { ErrorSection } from './ErrorSection';

describe('ErrorSection', () => {
  const title = "There's an error while editing your category";
  const description = 'Please try again later. If the error persists, contact support with the error code.';
  const onClose = jest.fn();

  test('Show error section with description, close button and icon', () => {
    render(<ErrorSection description={description} onClose={onClose} />);

    expect(screen.getByText(description)).toBeInTheDocument();
    expect(screen.queryByText(title)).not.toBeInTheDocument();
    expect(screen.getByTestId('ErrorOutlineOutlinedIcon')).toBeInTheDocument();
    expect(screen.getByRole('button', {
      name: /boton-cerrar-error/i,
    })).toBeInTheDocument();
  });
});
