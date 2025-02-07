import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AlertMessageSection } from './AlertMessageSection';

describe('AlertMessageSection', () => {
  const title = "There's an error while editing your category";
  const description = 'Please try again later. If the error persists, contact support with the error code.';
  const onClose = jest.fn();

  test('Show error section with description, close button and icon', () => {
    render(<AlertMessageSection description={description} onClose={onClose} />);

    expect(screen.getByText(description)).toBeInTheDocument();
    expect(screen.queryByText(title)).not.toBeInTheDocument();
    expect(screen.getByTestId('ErrorOutlineOutlinedIcon')).toBeInTheDocument();
    expect(screen.getByRole('button', {
      name: /boton-cerrar-error/i,
    })).toBeInTheDocument();
  });

  test('If a title is passed to the component, it should be shown', () => {
    render(<AlertMessageSection description={description} title={title} onClose={onClose} />);

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  test('If the icon will be hidden, it should not be shown', () => {
    render(<AlertMessageSection description={description} title={title} onClose={onClose} hideIcon />);

    expect(screen.queryByTestId('ErrorOutlineOutlinedIcon')).not.toBeInTheDocument();
  });

  test('Given a user clicking on the close button, the onClose function should be called', async () => {
    render(<AlertMessageSection description={description} title={title} onClose={onClose} />);

    const closeButton = screen.getByRole('button', {
      name: /boton-cerrar-error/i,
    });
    await act(async () => userEvent.click(closeButton));
    expect(onClose).toHaveBeenCalled();
  });
});
