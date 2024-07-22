import * as Yup from 'yup';
import { stringRequired } from './validations';

const budgetValidation = {
  name: Yup.string().min(3).max(20).required('Budget name is required'),
  limit: stringRequired('Budget limit is required'),
  currentAmount: stringRequired('Current amount is required'),
};

export const BudgetSchema = Yup.object(budgetValidation);
