import * as Yup from 'yup';

const createBudgetValidation = {
  name: Yup.string().min(3).max(20).required('Budget name is required'),
  description: Yup.string().min(3).max(150),
  limit: Yup.number().min(1).required('Budget limit is required'),
  currentAmount: Yup.number().min(0).required('Current amount is required'),
};

export const CreateBudgetSchema = Yup.object(createBudgetValidation);
