import * as Yup from 'yup';

export const AddSubcategorySchema = Yup.object({
  subcategory: Yup
    .string()
    .required('Por favor, ingrese una subcategoría')
    .min(3, 'Por favor, ingrese una subcategoría de más de 3 caracteres')
    .max(30, 'Por favor, ingrese una subcategoría con menos de 30 caracteres'),
});

export const EditCategorySchema = Yup.object({
  categoryName: Yup
    .string()
    .required('Por favor, ingrese un nombre de categoría')
    .min(3, 'Por favor, ingrese una categoría de más de 3 caracteres')
    .max(30, 'Por favor, ingrese una categoría con menos de 30 caracteres'),
  subcategories: Yup
    .array()
    .min(1, 'Por favor, agregue al menos una subcategoría')
    .max(20, 'Por favor, agregue menos de 20 subcategorías'),
});
