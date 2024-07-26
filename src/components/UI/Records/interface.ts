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

// Check the IndebtedPeople array and fields that may be different.
export interface CreateRecordValues {
  amount: string;
  shortName: string;
  description: string;
  category: string;
  subCategory: string;
  isPaid?: boolean;
  date: Dayjs;
  tag: string[];
  budgets: string[];
}

export interface CreateTransferValues extends CreateRecordValues {
  originAccount: string;
  destinationAccount: string;
  budgets: string[];
  tag: string[];
}

export interface CreateExpenseValues extends Omit<CreateRecordValues, 'amount'> {
  amount: number;
  tag: string[];
  budgets: string[];
  indebtedPeople: IndebtedPeople[];
  account: string;
}

export interface CreateIncomeValues extends CreateExpenseValues {
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
}

export interface SelectMonthYearBoxProps {
  isDashboard: boolean;
  isGuestUser?: boolean;
}
