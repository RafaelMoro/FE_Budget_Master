import { Category } from './globalInterface';

export const BACKEND_ENV_URI = process.env.REACT_APP_BACKEND_URI;
export const BACKEND_LOCAL_URI = 'http://localhost:6006/';
export const POST_METHOD = 'POST';
export const PUT_METHOD = 'PUT';
export const DELETE_METHOD = 'DELETE';

/** Errors */
export const NETWORK_CATCH_ERROR = 'Network Error';
export const JWT_EXPIRED_CATCH_ERROR = 'jwt expired';
export const ERROR_CATCH_USER_CREATED = 'Try with other email.';
export const EXPENSES_NOT_FOUND = 'Expenses not found.';

export const ERROR_TITLE_GENERAL = 'Error';
export const ERROR_MESSAGE_GENERAL = 'Oops! Something went wrong. Try again later.';
export const NETWORK_ERROR_MESSAGE = 'There is a network error. Please check you are connected to Internet.';

/** Errors Login Module */
export const USER_NOT_FOUND_CATCH_ERROR = 'User not found.';
export const TOKEN_EXPIRED_TITLE = 'Your token to reset your password has expired';
export const TOKEN_EXPIRED_DESC = 'Redirecting you to forgot password to try again.';
export const UNAUTHORIZED_ERROR = 'Email or Password incorrect.';
export const ERROR_MESSAGE_UNAUTHORIZED = 'Email or Password incorrect.';
export const ERROR_MESSAGE_EMAIL_EXISTS = 'The email entered is registered to other user. Please try with a different email.';

export const ERROR_MESSAGE_FETCH_CATEGORIES = 'We could not get your categories. Please try again later';
export const ERROR_CREATE_LOCAL_CATEGORIES = 'We could not create your categories. Please try again later';
export const ERROR_INCORRECT_MAIL_DESC = 'Verify that your email is correct or create an account.';

/** Success Login Module */
export const SUCCESS_PASSWORD_RESET_TITLE = 'Password reset successfully';
export const SUCCESS_PASSWORD_RESET_DESC = 'You may login with your new password.';
export const SUCCESS_FORGOT_PASSWORD_TITLE = 'Email Sent.';
export const SUCCESS_FORGOT_PASSWORD_DESC = 'Kindly check your email inbox and follow the instructions. Redirecting to sign in page';

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'December'];
export const ZERO_CURRENCY = '$0.00';

const FOOD_AND_DRINK_CATEGORY: Category = {
  _id: 'local-category-1',
  __v: 0,
  categoryName: 'Food and Drink',
  subCategories: [
    'Bar',
    'Alcohol & Cigarettes',
    'Takeout',
    'Fast Food',
    'Cofee shops',
    'Restaurants',
    'Groceries',
  ],
  icon: 'foodAndDrink',
};

const HOUSING_CATEGORY: Category = {
  _id: 'local-category-2',
  __v: 0,
  categoryName: 'Housing',
  subCategories: [
    'Rent',
    'Mortgage',
    'Home maintenance and Repairs',
    'Property taxes',
  ],
  icon: 'house',
};

const UTILITIES_CATEGORY: Category = {
  _id: 'local-category-3',
  __v: 0,
  categoryName: 'Utilities',
  subCategories: [
    'Electricity',
    'Gas',
    'Heating',
    'Water',
    'Internet',
    'Cable',
    'Mobile communication',
    'Safety',
  ],
  icon: 'utilities',
};
const SUSCRIPTIONS_CATEGORY: Category = {
  _id: 'local-category-4',
  __v: 0,
  categoryName: 'Subscriptions',
  subCategories: ['Streaming services', 'Gym', 'Software'],
  icon: 'subcriptions',
};
const TRANSPORTATION_CATEGORY: Category = {
  _id: 'local-category-5',
  __v: 0,
  categoryName: 'Transportation',
  subCategories: [
    'Gas/Fuel',
    'Car Rental',
    'Car maintenance and repair',
    'Parking fees',
    'Public Transportation',
    'Uber/Didi',
    'Airplane tickets',
    'Taxi',
  ],
  icon: 'transportation',
};
const FINANCIAL_EXPENSES_CATEGORY: Category = {
  _id: 'local-category-6',
  __v: 0,
  categoryName: 'Financial Expenses',
  subCategories: [
    'Counselling / Guidance',
    'Family',
    'Goverment fee/payment',
    'Bank Charges / fees',
    'Fines / Penalties',
    'Taxes',
    'Credit card debt',
    'Auto insurance / Car Loan',
    'Loan',
    'Payment',
    'Personal loan',
    'Funding',
    'Insurance',
  ],
  icon: 'debtAndLoans',
};
const HEALTHCARE_CATEGORY: Category = {
  _id: 'local-category-7',
  __v: 0,
  categoryName: 'Health and Personal Care',
  subCategories: [
    'Barber',
    'Therapist / Mental Health',
    'Speciality Care',
    'Dental care',
    'Urgent care',
    'Medicines',
    'Hospital',
    'Prescriptions',
    'Out of pocket costs for primary care',
    'Health supplements',
  ],
  icon: 'healthCare',
};
const KIDS_CATEGORY: Category = {
  _id: 'local-category-8',
  __v: 0,
  categoryName: 'Kids',
  subCategories: [
    'Child support',
    'Necessities',
    'Tuition / Tutoring',
    'Toys',
    'Gifts',
    'School supplies / lunch',
    'Extra-curricular activities',
    'Go out',
    'Clothing',
    'Footwear',
  ],
  icon: 'kids',
};
const SHOPPING: Category = {
  _id: 'local-category-9',
  __v: 0,
  categoryName: 'Shopping',
  subCategories: [
    'Clothes',
    'Footwear',
    'Kids',
    'House / Garden',
    'Electronics / accesories',
    'Videogames',
    'Software',
    'Pharmacy',
    'Jewerly / accesories',
    'Pets',
    'Stationery / tools',
    'Gifts',
    'Health and beauty',
    'Free time / Hobbies',
  ],
  icon: 'shopping',
};
const ENTERTAINMENT_AND_LEISURE_CATEGORY: Category = {
  _id: 'local-category-10',
  __v: 0,
  categoryName: 'Entertainment and Leisure',
  subCategories: [
    'Go Out',
    'Wellness and beauty',
    'Charity / Gifts',
    'Sports events / Culture',
    'Sports / Fitness',
    'Education / Personal development',
    'Special events',
    'Books, audiobooks',
    'Lottery / Gambling',
    'Vacations / Hotel',
    'Hobbies',
    'Concerts',
    'Cinema',
  ],
  icon: 'entertainment',
};
const SAVINGS_CATEGORY: Category = {
  _id: 'local-category-11',
  __v: 0,
  categoryName: 'Savings',
  subCategories: [
    'Savings',
    'Collectible',
    'Emergency Fund',
    'Retirement',
    'Investments',
    'Vacations',
    'Car / Real property ',
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
