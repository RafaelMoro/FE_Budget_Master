import { Category } from './globalInterface';

export const BUDGET_MASTER_LANDING = 'https://budget-master.space';

export const BACKEND_ENV_URI = process.env.REACT_APP_BACKEND_URI;
export const BACKEND_LOCAL_URI = 'http://localhost:6006/';
export const POST_METHOD = 'POST';
export const PUT_METHOD = 'PUT';
export const DELETE_METHOD = 'DELETE';

/** Errors */
export const NETWORK_CATCH_ERROR = 'Network Error';
export const JWT_EXPIRED_CATCH_ERROR = 'jwt expired';
export const INVALID_SIGNATURE_ERROR = 'invalid signature';
export const ERROR_CATCH_USER_CREATED = 'Try with other email.';
export const EXPENSES_NOT_FOUND = 'Expenses not found.';

export const ERROR_TITLE_GENERAL = 'Error';
export const ERROR_MESSAGE_GENERAL = 'Oops! Algo no salió como esperabamos. Por favor, intente de nuevo más tarde.';
export const NETWORK_ERROR_MESSAGE = 'There is a network error. Please check you are connected to Internet.';

/** Errors Login Module */
export const USER_NOT_FOUND_CATCH_ERROR = 'User not found.';
export const TOKEN_EXPIRED_TITLE = 'Su token para restablecer su contraseña ha caducado';
export const TOKEN_EXPIRED_DESC = 'Redirigiendo a la página de olvidé contraseña. Vuelva a intentar todo el proceso por favor.';
export const UNAUTHORIZED_ERROR = 'Email or Password incorrect.';
export const ERROR_MESSAGE_UNAUTHORIZED = 'Correo electronico o contraseña incorrecta.';
export const ERROR_MESSAGE_EMAIL_EXISTS = 'El correo electrónico ya está registrado. Intente con otro correo electrónico.';
export const ERROR_MESSAGE_USER_NOT_FOUND = 'El correo electrónico no está registrado a una cuenta.';

export const ERROR_MESSAGE_FETCH_CATEGORIES = 'We could not get your categories. Please try again later';
export const ERROR_CREATE_LOCAL_CATEGORIES = 'We could not create your categories. Please try again later';
export const ERROR_INCORRECT_MAIL_DESC = 'Verify that your email is correct or create an account.';

/** Success Login Module */
export const SUCCESS_PASSWORD_RESET_TITLE = 'Contraseña reestablecida correctamente';
export const SUCCESS_PASSWORD_RESET_DESC = 'Ahora puede iniciar sesión con su nueva contraseña.';
export const SUCCESS_FORGOT_PASSWORD_TITLE = 'Correo electrónico enviado.';
// eslint-disable-next-line max-len
export const SUCCESS_FORGOT_PASSWORD_DESC = 'Por favor, revise su correo electrónico y siga las instrucciones. Redirigiendo a la página de inicio de sesión.';

export const ZERO_CURRENCY = '$0.00';

const FOOD_AND_DRINK_CATEGORY: Category = {
  _id: 'local-category-1',
  __v: 0,
  categoryName: 'Comida y Bebida',
  subCategories: [
    'Bar',
    'Alcohol & Cigarros',
    'Comida para llevar',
    'Comida rápida',
    'Cafetería',
    'Restaurantes',
    'Despensa',
  ],
  icon: 'foodAndDrink',
};

const HOUSING_CATEGORY: Category = {
  _id: 'local-category-2',
  __v: 0,
  categoryName: 'Vivienda',
  subCategories: [
    'Renta',
    'Hipoteca',
    'Mantenimiento y reparaciones del hogar',
    'Impuestos sobre la vivienda',
  ],
  icon: 'house',
};

const UTILITIES_CATEGORY: Category = {
  _id: 'local-category-3',
  __v: 0,
  categoryName: 'Servicios básicos',
  subCategories: [
    'Luz',
    'Gas',
    'Calefacción',
    'Agua',
    'Internet',
    'Cable',
    'Communicación móvil',
    'Seguridad',
  ],
  icon: 'utilities',
};
const SUSCRIPTIONS_CATEGORY: Category = {
  _id: 'local-category-4',
  __v: 0,
  categoryName: 'Suscripciones',
  subCategories: [
    'Servicios de streaming',
    'Gimnasio',
    'Software',
    'Membresías',
    'Aprendizaje y educación',
    'Suscripciones en línea',
  ],
  icon: 'subcriptions',
};
const TRANSPORTATION_CATEGORY: Category = {
  _id: 'local-category-5',
  __v: 0,
  categoryName: 'Transporte',
  subCategories: [
    'Gasolina',
    'Renta de carro',
    'Mantenimiento y reparaciones del carro',
    'Tarifas de estacionamiento',
    'Transporte público',
    'Uber/Didi',
    'Boletos de avión',
    'Taxi',
  ],
  icon: 'transportation',
};
const FINANCIAL_EXPENSES_CATEGORY: Category = {
  _id: 'local-category-6',
  __v: 0,
  categoryName: 'Gastos financieros',
  subCategories: [
    'Asesoramiento u orientación',
    'Asignación familiar',
    'Pagos gubernamentales',
    'Comisiones bancarias',
    'Multas o penalizaciones',
    'Cargos y tasas',
    'Impuestos',
    'Deuda de tarjeta de crédito',
    'Seguro o préstamo del carro',
    'Préstamo',
    'Pago',
    'Financiamiento',
    'Seguro',
    'Intereses',
  ],
  icon: 'debtAndLoans',
};
const HEALTHCARE_CATEGORY: Category = {
  _id: 'local-category-7',
  __v: 0,
  categoryName: 'Salud',
  subCategories: [
    'Barbero / Peluquería',
    'Psicólogo / Salud mental',
    'Atención médica especializada',
    'Cuidado dental',
    'Atención de urgencia',
    'Medicinas',
    'Hospital',
    'Recetas médicas',
    'Suplementos de salud',
  ],
  icon: 'healthCare',
};
const KIDS_CATEGORY: Category = {
  _id: 'local-category-8',
  __v: 0,
  categoryName: 'Niños',
  subCategories: [
    'Pensión alimenticiat',
    'Necesidades básicas',
    'Clases particulares',
    'Juguetes',
    'Regalos',
    'Útiles escolares / almuerzo',
    'Actividades extracurriculares',
    'Salidas',
    'Ropa',
    'Calzado',
  ],
  icon: 'kids',
};
const SHOPPING: Category = {
  _id: 'local-category-9',
  __v: 0,
  categoryName: 'Compras',
  subCategories: [
    'Ropa',
    'Calzado',
    'Niños',
    'Casa y jardín',
    'Electrónica o accesorios',
    'Videojuegos',
    'Software',
    'Farmacia',
    'Joyeria',
    'Mascotas',
    'Papelería / Herramientas',
    'Regalos',
    'Salud y belleza',
    'Tiempo libre / Hobbies',
  ],
  icon: 'shopping',
};
const ENTERTAINMENT_AND_LEISURE_CATEGORY: Category = {
  _id: 'local-category-10',
  __v: 0,
  categoryName: 'Entretenimiento',
  subCategories: [
    'Salidas',
    'Bienestar y belleza',
    'Donaciones / Regalos',
    'Eventos deportivos / Cultura',
    'Deportes / Fitness',
    'Educación / Desarrollo personal',
    'Eventos especiales',
    'Libros, audiolibros',
    'Lotería / Juegos de azar',
    'Vacaciones / Hotel',
    'Hobbies',
    'Conciertos',
    'Cine',
  ],
  icon: 'entertainment',
};
const SAVINGS_CATEGORY: Category = {
  _id: 'local-category-11',
  __v: 0,
  categoryName: 'Ahorro',
  subCategories: [
    'Ahorros',
    'Fondo de emergencia',
    'Jubilación',
    'Inversiones',
    'Vacaciones',
    'Automóvil / Propiedad inmobiliaria ',
  ],
  icon: 'savings',
};
export const CATEGORIES_RECORDS: Category[] = [
  FOOD_AND_DRINK_CATEGORY,
  HOUSING_CATEGORY,
  UTILITIES_CATEGORY,
  SUSCRIPTIONS_CATEGORY,
  TRANSPORTATION_CATEGORY,
  FINANCIAL_EXPENSES_CATEGORY,
  HEALTHCARE_CATEGORY,
  KIDS_CATEGORY,
  SHOPPING,
  ENTERTAINMENT_AND_LEISURE_CATEGORY,
  SAVINGS_CATEGORY,
];
