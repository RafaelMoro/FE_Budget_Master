import { SerializedError } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { SystemStateEnum } from '../enums';

export interface UserInfo {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  sub: string;
}

export interface User {
  user: UserInfo;
  bearerToken: string;
  accessToken: string;
}

export const TYPE_OF_ACCOUNTS = ['Credit', 'Debit', 'Food Voucher', 'Restaurant Voucher', 'Savings'] as const;
export type AccountType = typeof TYPE_OF_ACCOUNTS[number];

export const ABBREVIATED_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'] as const;
export type AbbreviatedMonthsType = typeof ABBREVIATED_MONTHS[number];

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;
export type CompleteMonthsType = typeof MONTHS[number];

export interface GeneralResponse {
  data: object | null;
  error: null | SerializedError;
  message: null | string;
  success: boolean;
  version: string;
}

export interface RequestBearerTokenProps {
  bearerToken: string;
}

export interface GeneralError {
  data: GeneralResponse;
  status: number
}

// This interface is used for unit test reject responses.
export interface MockedError {
  status: string;
  error: string;
}

export interface Account {
  _id: string;
  __v: number;
  title: string;
  amount: number;
  accountType: AccountType;
  backgroundColor: string;
  color: string;
  sub?: string;
}

export interface IndebtedPeople {
  _id?: string;
  name: string;
  amount: string;
  amountPaid: string;
  isPaid: boolean;
}

export interface IndebtedPeopleTable extends Omit<IndebtedPeople, 'amount' | 'amountPaid'> {
  amount: string;
  amountPaid: string;
  restingDebt: string;
}

export interface Category {
  _id: string;
  __v: number;
  categoryName: string;
  subCategories: string[];
  icon: string;
}

export type TypeBudget = 'one-time' | 'periodic';
export type PeriodBudget = 'weekly' | 'bi-weekly' | 'montly' | 'daily' | 'yearly';

export interface Budget {
  _id: string
  __v: number;
  name: string;
  typeBudget: TypeBudget;
  description: string;
  // start date and end date are saved as strings because of the non serialized error in redux but these are Date type
  startDate: string;
  endDate: string;
  limit: number;
  currentAmount: number;
  period: PeriodBudget;
  // nextResetDate is saved as strings because of the non serialized error in redux but these are Date type
  nextResetDate: string;
  isActive: boolean;
  previousPeriods: string[];
}

export interface BudgetUI extends Budget {
  limitFormatted: string;
  currentAmountFormatted: string;
  startDateFormatted: string;
  endDateFormatted: string;
}

export type TypeOfRecord = 'expense' | 'income' | 'transfer';

export interface TransferRecord {
  transferId: string;
  account: string;
}

export interface AccountRecord {
  _id: string;
  transferRecord?: TransferRecord;
  userId: string;
  shortName: string;
  typeOfRecord: TypeOfRecord;
  description: string;
  amount: number;
  amountFormatted: string;
  date: Date;
  fullDate: string;
  formattedTime: string;
  category: Category;
  subCategory: string;
  tag: string[];
  indebtedPeople: IndebtedPeople[];
  account: string;
  budgets: string[];
}

export interface Expense extends AccountRecord {
  isPaid: boolean;
}
// In local storage we save the date as a string
export interface ExpenseLocalStorage extends Omit<Expense, 'date'> {
  date: string;
}

export interface UpdateMultipleExpensesError {
  statusCode: number;
  message: string;
  error: string;

}

export interface Income extends AccountRecord {
  expensesPaid: Expense[];
}

export interface ExpensePaid {
  _id: string;
  shortName: string;
  amount: number;
  amountFormatted: string;
  formattedTime: string;
  fullDate: string;
  isPaid: boolean;
  date: Date;
}

export interface ExpensePaidRedux extends Omit<ExpensePaid, 'date'> {
  date: string;
}

export interface AnyRecord extends AccountRecord {
  isPaid?: boolean;
  expensesPaid?: ExpensePaid[];
}

// We do not load records on redux but only the ones of local storage
export interface RecordRedux extends Omit<AnyRecord, 'date' | 'expensesPaid'> {
  date: string;
  expensesPaid?: ExpensePaidRedux[];
}

export interface MonthTotal {
  expenseTotal: string;
  incomeTotal: string;
}

export interface RecordsTotal {
  currentMonth: MonthTotal;
  lastMonth: MonthTotal;
  olderRecords: MonthTotal;
}

export interface GlobalNotification {
  title: string;
  description: string;
  status: SystemStateEnum;
  showNotification: boolean;
}

export interface SelectFormikFieldProps {
  name: string;
  value: string;
}

export interface SelectFormikFormProps {
  setFieldValue: (name: string, value: string) => void;
}

export interface SelectFormikProps {
  children: ReactNode;
  field: SelectFormikFieldProps;
  form: SelectFormikFormProps;
  dataTestId: string;
  disabled?: boolean;
}

export interface LazyFetchRecords {
  newMonth?: AbbreviatedMonthsType;
  completeMonth?: CompleteMonthsType;
  newYear?: string;
}
