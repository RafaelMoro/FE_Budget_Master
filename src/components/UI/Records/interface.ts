import { ReactNode } from 'react';
import { Dayjs } from 'dayjs';
import {
  Category, ExpensePaid, AnyRecord, IndebtedPeople, CompleteMonthsType,
  GeneralResponse,
  SelectFormikProps,
} from '../../../globalInterface';

export interface RecordProps {
  record: AnyRecord;
  backgroundColor: string;
}

export interface RecordTableProps {
  isGrid?: boolean;
}

export interface RecordListProps {
  records: AnyRecord [];
}

export interface RecordDrawerProps {
  record: AnyRecord;
  chipColor: string;
  amountShown: ReactNode;
  expensesPaid: ExpensePaid[];
  onCloseCb?: () => void;
  openDeleteRecordModal?: () => void;
}

export interface IncomeAndExpensesResponse extends Omit<GeneralResponse, 'data'> {
  data: {
    records: AnyRecord [];
  };
}

export interface CategoriesResponse extends Omit<GeneralResponse, 'data'> {
  data: {
    categories: Category[];
  };
}

export interface ExpenseBudget {
  budgetId: string;
  budgetName: string;
}

export interface SelectCategoryProps extends SelectFormikProps {
  setNewCategory: (value: string) => void;
}

// There is no CreateIncomeValues because the only prop would differentiate is expensesPaid,
// which is added in the CreateIncomeValuesApiRequest separately.
export interface CreateRecordValues {
  amount: string;
  shortName: string;
  description: string;
  category: string;
  subCategory: string;
  date: Dayjs;
  tag: string[];
  budgets: string[];
}

export interface CreateExpenseValues extends CreateRecordValues {
  isPaid?: boolean;
  // Setting it as string instead of string[] because we want to link a single budget
  linkedBudgets: string;
}

export interface CreateTransferValues extends CreateRecordValues {
  originAccount: string;
  destinationAccount: string;
  budgets: string[];
  tag: string[];
  isPaid?: boolean;
}

export interface CreateExpenseValuesApiRequest extends Omit<CreateRecordValues, 'amount' | 'date'> {
  amount: number;
  date: Date;
  tag: string[];
  budgets: string[];
  indebtedPeople: IndebtedPeople[];
  account: string;
  isPaid?: boolean;
}

export interface CreateIncomeValuesApiRequest extends Omit<CreateRecordValues, 'amount' | 'date'> {
  amount: number;
  date: Date;
  tag: string[];
  budgets: string[];
  indebtedPeople: IndebtedPeople[];
  account: string;
  expensesPaid: ExpensePaid[];
}

export interface RecordOperationResponse extends Omit<GeneralResponse, 'data'> {
  data: {
    record: AnyRecord;
  };
}

// Same response for income and expense
export interface DeleteRecordResponse extends Omit<GeneralResponse, 'data'> {
  data: AnyRecord;
}

// Select Month and year on select expense
export interface SelectMonthYearValues {
  month: CompleteMonthsType;
  year: string;
}

export interface ListExpandableContainerProps {
  color: string;
}

export interface SelectExpensesCellProps {
  noHorizontalPadding?: boolean;
}

export interface GetMockExpenseProps {
  paidStatus?: boolean;
  budgets?: string[];
  tag?: string[];
  shortName?: string;
  hasLinkedBudgets?: boolean;
}

export interface SelectMonthYearBoxProps {
  isDashboard: boolean;
  isGuestUser?: boolean;
}
