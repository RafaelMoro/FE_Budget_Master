import * as Yup from 'yup';
import { stringRequired } from './validations';

const budgetValidation = {
  name: Yup
    .string()
    .min(3, 'El nombre del presupuesto debe tener al menos 3 caracteres.')
    .max(50, 'El nombre del presupuesto no puede tener más de 50 caracteres.')
    .required('Por favor, ingrese un nombre para el presupuesto'),
  limit: stringRequired('Por favor, ingrese un límite para el presupuesto'),
  currentAmount: stringRequired('Por favor, ingrese una cantidad que ha gastado hasta ahora. Puede ser 0'),
};

export const BudgetSchema = Yup.object(budgetValidation);
