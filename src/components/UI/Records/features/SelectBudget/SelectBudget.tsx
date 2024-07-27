import { FormControl, InputLabel } from '@mui/material';
import { Field } from 'formik';

import { SelectFormik } from '../../../SelectInput/SelectFormik';
import { MenuItem } from '../../../../../styles';
import { ExpenseBudget } from '../../interface';

interface SelectBudgetProps {
  budgets: ExpenseBudget[];
}

const SelectBudget = ({ budgets }: SelectBudgetProps) => (
  <FormControl variant="standard">
    <InputLabel id="select-record-budget">Budgets</InputLabel>
    <Field dataTestId="select-record-budget" name="linkedBudgets" component={SelectFormik}>
      {
        budgets.map((budget) => (
          <MenuItem key={budget.budgetId} value={budget.budgetId}>{budget.budgetName}</MenuItem>
        ))
      }
    </Field>
  </FormControl>
);

export { SelectBudget };
