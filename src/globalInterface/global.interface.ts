import { AxiosRequestHeaders, AxiosResponse } from 'axios';
import { SystemStateEnum } from '../enums';

export interface User {
  accessToken: string;
  email: string;
  bearerToken: AxiosRequestHeaders;
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

export interface GeneralResponse extends AxiosResponse {
  version: string;
  success: boolean;
  message: null | string;
  data: unknown | null;
  error: null | never;
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
  amount: number;
  amountPaid: number;
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
}

export interface AccountRecord {
  _id: string;
  userId: string;
  shortName: string;
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
  date?: Date;
}

export interface AnyRecord extends AccountRecord {
  isPaid?: boolean;
  expensesPaid?: ExpensePaid[];
}

export interface MonthTotal {
  expenseTotal: string;
  incomeTotal: string;
}

export interface RecordsTotal {
  currentMonth: MonthTotal;
  lastMonth: MonthTotal;
}

export interface AllRecords {
  currentMonth: AnyRecord[] | null;
  lastMonth: AnyRecord[] | null;
  olderRecords: AnyRecord[] | null;
}

export interface GlobalNotification {
  title: string;
  description: string;
  status: SystemStateEnum;
  showNotification: boolean;
}
