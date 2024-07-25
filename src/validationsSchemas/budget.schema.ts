import * as Yup from 'yup';
import { stringRequired } from './validations';

const budgetValidation = {
  name: Yup
    .string()
    .min(3, 'Budget name must be at least 3 characters')
    .max(20, 'Budget name must be at most 20 characters')
    .required('Budget name is required'),
  limit: stringRequired('Budget limit is required'),
  currentAmount: stringRequired('Amount spent is required'),
};

export const BudgetSchema = Yup.object(budgetValidation);
