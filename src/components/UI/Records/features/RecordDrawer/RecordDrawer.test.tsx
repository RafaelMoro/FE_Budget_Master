import { screen, within } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { renderWithProviders } from '../../../../../tests/CustomWrapperRedux';
import { mockExpense } from '../../Record.mocks';
import { RecordDrawer } from './RecordDrawer';
import { RecordExpense, RecordIncome } from '../../Records.styled';

const ScaffoldedRecordDrawer = ({ amountFormatted, isExpense = false }: { amountFormatted: string, isExpense?: boolean }) => {
  const onClose = jest.fn();
  const showDeleteRecordModal = jest.fn();
  const amountShown = isExpense
    ? (
      <RecordExpense variant="subtitle1">
        -
        {' '}
        { amountFormatted }
      </RecordExpense>
    )
    : (
      <RecordIncome variant="subtitle1">
        +
        {' '}
        { amountFormatted }
      </RecordIncome>
    );

  return (
    <RecordDrawer
      chipColor="black"
      onCloseCb={onClose}
      record={mockExpense}
      amountShown={amountShown}
      expensesPaid={[]}
      openDeleteRecordModal={showDeleteRecordModal}
    />
  );
};

test('Render Record Drawer', () => {
  const history = createMemoryHistory();
  renderWithProviders(
    <Router location={history.location} navigator={history}>
      <ScaffoldedRecordDrawer amountFormatted="$204.00" />
      ,
    </Router>,
  );

  const view = screen.getByTestId('record-drawer');

  expect(screen.getByTestId('CloseIcon')).toBeInTheDocument();
  expect(screen.getByText(/May 20/i)).toBeInTheDocument();
  expect(screen.getByText('Casa a solesta gym')).toBeInTheDocument();
  expect(within(view).getByTestId('DeleteOutlinedIcon')).toBeInTheDocument();
  expect(within(view).getByTestId('EditOutlinedIcon')).toBeInTheDocument();
  expect(screen.getByText(/\$204\.00/)).toBeInTheDocument();
  expect(screen.getByText('Sin pagar')).toBeInTheDocument();
  expect(screen.getByText(/^categoría/i)).toBeInTheDocument();
  expect(screen.getByText(/subcategoría/i)).toBeInTheDocument();
});
