import * as Yup from 'yup';

// General validations
export const stringRequired = (message: string) => Yup.string().required(message);

export const emailValidation = Yup.string().email('Correo electronico inválido').required('Por favor, ingrese su correo electrónico');
export const firstNameValidation = Yup.string().required('Por favor, ingrese su nombre').min(2);
export const lastNameValidation = Yup.string().required('Por favor, ingrese su apellido').min(2);
export const middleNameValidation = Yup.string().min(2);

export const confirmPasswordValidation = Yup.string()
  .required('Por favor, ingrese su contraseña nuevamente')
  .oneOf([Yup.ref('password'), null], 'Contraseña y confirmar contraseña deben ser iguales.');

export const passwordValidation = (requiredMessage: string, onlyRequired = false) => {
  if (onlyRequired) return Yup.string().required(requiredMessage);
  return Yup.string()
    .required(requiredMessage)
    .min(8, 'La contraseña debe tener al menos 8 caracteres. Ingrese más caracteres')
    .max(32, 'La contraseña puede tener un máximo de 32 caracteres. Ha excedido los 32 caracteres')
    .matches(/[A-Z]+/, 'La contraseña debe contener al menos 1 mayúscula')
    .matches(/[a-z]+/, 'La contraseña debe contener al menos 1 minúscula')
    .matches(/[0-9]+/, 'La contraseña debe contener al menos 1 número')
    .matches(/^\S*$/, 'La contraseña no debe contener espacios en blanco.')
    .matches(
      /[!@#$%^&*()[\]{}+*\-_.,;:/<>?=`~\\|']+/,
      'La contraseña debe contener al menos 1 caracter especial como !@#$%^&*()[]{}+*-_.,;:/<>?=`~|\\|',
    );
};

//  ****** Account validations

export const accountTitleValidation = Yup.string().required('Por favor, ingrese el título de su cuenta.');
export const accountAmountValidation = Yup.string().required('Por favor, ingrese la cantidad actual de su cuenta.');

/** Record validations  */
export const shortNameValidation = Yup
  .string()
  .required('Short description is required')
  .min(3, 'Short description is too short')
  .max(50, 'Short description is too long. Use Description field instead.');
export const tagOrBudgetValidation = (message: string) => Yup.string().min(3).max(20).required(message);
export const tagOrBudgetValidationRequired = Yup.string().min(3).max(20).required();
export const indebtedName = Yup.string().min(3, 'Full name must be at least 3 characters.').required('Full name is required');
export const indebtedIsPaid = Yup.boolean().required();
