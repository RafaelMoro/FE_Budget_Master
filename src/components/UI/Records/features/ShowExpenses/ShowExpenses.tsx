import {
  TableHead, TableRow, TableBody, TablePagination,
} from '@mui/material';
import { useMemo } from 'react';

import { ExpensePaid } from '../../../../../globalInterface';
import { RecordTable, TableTitle } from '../RecordDrawer/RecordDrawer.styled';
import { EmptyTableRow } from '../../../Table/EmptyTableRow';
import { TableCell } from '../../../../../styles';
import { usePaginationTable } from '../../../../../hooks/usePaginationTable';
import { InstructionsAddExpense } from '../../Records.styled';

interface ShowExpensesProps {
  expenses: ExpensePaid[];
  usePagination?: boolean;
  isGrid?: boolean;
}

const ShowExpenses = ({ expenses = [], usePagination = false, isGrid = false }: ShowExpensesProps) => {
  const {
    emptyRows, handleChangePage, handleChangeRowsPerPage, page, rowsPerPage,
  } = usePaginationTable({ arrayOfOptions: expenses, initialRowsPerPage: 5 });

  const visibleRows = useMemo(
    () => expenses.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    ),
    [expenses, page, rowsPerPage],
  );

  const expensesArray = usePagination ? visibleRows : expenses;

  if (expenses.length === 0) {
    return (
      <InstructionsAddExpense variant="body2" align="center">
        Nota: Puede relacionar gastos a este pago para saber
        que transacciones han sido pagadas. Para ello, de click en &quot; Agregar Gasto &quot;.
      </InstructionsAddExpense>
    );
  }
  return (
    <>
      <TableTitle align="center" isGrid={isGrid}>Gastos seleccionados: </TableTitle>
      <RecordTable isGrid={isGrid}>
        <TableHead>
          <TableRow>
            <TableCell>Nombre:</TableCell>
            <TableCell>Fecha:</TableCell>
            <TableCell>Hora:</TableCell>
            <TableCell>Monto:</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { expensesArray.map((expense, index) => (
            <TableRow key={`${expense._id}-${index + 1}`}>
              <TableCell>{expense.shortName}</TableCell>
              <TableCell>{expense.fullDate}</TableCell>
              <TableCell>{expense.formattedTime}</TableCell>
              <TableCell>{expense.amountFormatted}</TableCell>
            </TableRow>
          )) }
          {(emptyRows > 0 && usePagination) && (<EmptyTableRow emptyRows={emptyRows} colSpan={4} />)}
        </TableBody>
      </RecordTable>
      { (usePagination) && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          rowsPerPage={rowsPerPage}
          count={expenses.length}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página"
        />
      ) }
    </>
  );
};

export { ShowExpenses };
