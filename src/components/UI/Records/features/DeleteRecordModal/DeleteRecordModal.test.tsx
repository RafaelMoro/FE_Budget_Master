import { screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { DeleteRecordModal } from './DeleteRecordModal';
import { mockExpense } from '../../Record.mocks';
import { renderWithProviders } from '../../../../../tests/CustomWrapperRedux';

describe('<DeleteRecordModal />', () => {
  const onClose = jest.fn();
  const closeDrawer = jest.fn();
  const history = createMemoryHistory();
  test('Show delete record modal', () => {
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <DeleteRecordModal record={mockExpense} open onClose={onClose} isExpense closeDrawer={closeDrawer} />
      </Router>,
    );

    expect(screen.getByText(/Está seguro que desea borrar la transacción:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /eliminar/i })).toBeInTheDocument();
  });
});
