import * as Yup from 'yup';
import { stringRequired } from './validations';

const createBudgetValidation = {
  name: Yup.string().min(3).max(20).required('Budget name is required'),
  description: Yup.string().min(3).max(150),
  limit: stringRequired('Budget limit is required'),
  currentAmount: stringRequired('Current amount is required'),
};

export const CreateBudgetSchema = Yup.object(createBudgetValidation);
