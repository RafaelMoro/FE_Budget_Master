import { alpha } from '@mui/material/styles';
import { Typography } from '@mui/material';

import { EnhancedTableToolbarProps } from './interface';
import { SelectExpensesToolbar } from '../Features.styled';

function EnhancedTableToolbar({ numSelected }: EnhancedTableToolbarProps) {
  return (
    <SelectExpensesToolbar
      sx={{
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      <>
        <Typography variant="body2">
          Nota: Si no puede encontrar un gasto, puede estar en otra cuenta o en un diferente mes.
        </Typography>
        <Typography
          id="tableTitle"
        >
          Seleccione los gastos a pagar:
        </Typography>
        { (numSelected > 0) && (
        <Typography>
          {numSelected}
          {' '}
          seleccionados
        </Typography>
        ) }
      </>
    </SelectExpensesToolbar>
  );
}

export { EnhancedTableToolbar };
