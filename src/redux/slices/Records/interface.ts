import {
  RecordOperationResponse, CreateExpenseValuesApiRequest, CreateIncomeValuesApiRequest, DeleteRecordResponse,
} from '../../../components/UI/Records/interface';
import {
  AnyRecord, Expense, GeneralResponse, RecordsTotal,
} from '../../../globalInterface';
import { RecordAgeCategory } from '../../../aliasType';
import { RecordsLocalStorage } from '../../../utils/LocalStorage/interface';

export interface RecordsInitialState {
  totalRecords: RecordsTotal;
  recordToBeModified: AnyRecord | null;
  recordsLocalStorageSelectedAccount: RecordsLocalStorage | null;
  recordsLocalStorage: RecordsLocalStorage[] | null;
}

export interface GetRecordByMonthAndYearProps {
  route: string;
  bearerToken: string;
}

export interface GetExpensesResponse extends Omit<GeneralResponse, 'data'> {
  data: {
    expenses: Expense[];
  };
}

export interface UpdateTotalExpenseIncomePayload {
  newAmount: string;
  recordAgeCategory: RecordAgeCategory;
}

type PeriodRecord = 'CurrentMonth' | 'LastMonth' | 'OlderRecords';

interface UpdateTotalExpenseAndIncomePayload {
  expenseTotalCounter: string;
  incomeTotalCounter: string
  period: PeriodRecord;
}

export interface UpdateTotalExpenseAndIncomeProps {
  payload: UpdateTotalExpenseAndIncomePayload;
  type: string;
}

export interface UpdateTotalExpenseIncomeAction {
  payload: UpdateTotalExpenseIncomePayload;
  type: string;
}

export interface CreateExpenseMutationProps {
  values: CreateExpenseValuesApiRequest;
  bearerToken: string;
}

export interface RecordOperationThunkResponse {
  response: RecordOperationResponse;
  isLastMonth?: boolean;
  isCurrentMonth?: boolean;
}

export interface CreateIncomeThunkProps extends Omit<CreateExpenseMutationProps, 'values'> {
  values: CreateIncomeValuesApiRequest;
}

export interface DeleteRecordProps {
  recordId: string;
}

export interface DeleteRecordMutationProps {
  values: DeleteRecordProps;
  route: string;
  bearerToken: string;
}

export interface DeleteExpenseMutationProps {
  values: DeleteRecordProps;
  bearerToken: string;
}

export interface CreateTransferValues {
  expense: CreateExpenseValuesApiRequest;
  income: CreateIncomeValuesApiRequest;
}

export interface CreateTransferMutationProps {
  values: CreateTransferValues;
  bearerToken: string;
}

export interface DeleteExpenseThunkResponse extends Omit<RecordOperationThunkResponse, 'response'> {
  response: DeleteRecordResponse;
  values: DeleteRecordProps;
}

export interface EditExpenseValues extends CreateExpenseValuesApiRequest {
  recordId: string;
}

export interface EditIncomeValues extends CreateIncomeValuesApiRequest {
  recordId: string;
}

export interface EditExpenseThunkProps extends Omit<CreateExpenseMutationProps, 'values'> {
  values: EditExpenseValues;
}

export interface EditIncomeThunkProps extends Omit<CreateExpenseMutationProps, 'values'> {
  values: EditIncomeValues;
}

export interface UpdateRelatedExpenses extends Omit<CreateExpenseMutationProps, 'values'> {
  payload: UpdateRelatedExpensesValues[];
}

export interface EditIncomeThunkResponse extends Omit<RecordOperationThunkResponse, 'response'> {
  response: RecordOperationResponse;
}

export interface UpdateRelatedExpensesValues {
  recordId: string;
  isPaid: boolean;
}

export interface UpdatedRelatedExpensesResponse {
  response: Expense[];
  isLastMonth?: boolean;
  isCurrentMonth?: boolean;
}
