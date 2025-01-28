import * as Yup from 'yup';
import {
  indebtedName, tagOrBudgetValidation, indebtedIsPaid, stringRequired, shortNameValidation,
} from './validations';

export const TagOrBudgetSchema = (name: string) => {
  const capitalizeName = name.charAt(0).toUpperCase() + name.slice(1);
  return Yup.object({
    [name]: tagOrBudgetValidation(`${capitalizeName} cannot be added empty.`),
  });
};

export const IndebtedPeopleFormSchema = Yup.object({
  name: indebtedName,
  amount: stringRequired('Por favor, ingrese una cantidad'),
  amountPaid: stringRequired('Por favor, ingrese la cantidad pagada hasta ahora'),
  isPaid: indebtedIsPaid,
});

const categorySubcategoryValidation = {
  category: stringRequired('Por favor, selecciona una categoría'),
  subCategory: stringRequired('Por favor, seleccione una subcategoría'),
};

const createRecordValidation = {
  ...categorySubcategoryValidation,
  shortName: shortNameValidation,
  description: Yup.string()
    .min(3, 'Por favor, ingrese una descripción de más de 3 caracteres')
    .max(300, 'Por favor, ingrese una descripción con mmenos de 300 caracteres.'),
  amount: stringRequired('Por favor, ingrese una cantidad'),
};

export const CreateRecordSchema = Yup.object(createRecordValidation);
export const TestCategorySchema = Yup.object(categorySubcategoryValidation);

export const TransferSchema = Yup.object({
  ...createRecordValidation,
  originAccount: stringRequired('Origin account is required'),
  destinationAccount: stringRequired('Destination account is required'),
});
