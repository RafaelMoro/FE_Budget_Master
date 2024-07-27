import { CreateExpenseValuesApiRequest, CreateIncomeValues } from '../../components/UI/Records/interface';
import { AbbreviatedMonthsType, RecordRedux } from '../../globalInterface';
import { RecordAgeStatusKey } from '../../utils/LocalStorage/interface';

export function isCreateExpense(values: CreateExpenseValuesApiRequest | CreateIncomeValues): values is CreateExpenseValuesApiRequest {
  return (values as CreateExpenseValuesApiRequest).isPaid !== undefined;
}

export const getAgeLocalRecord = (
  { month, lastMonth, currentMonth }
  : { month: AbbreviatedMonthsType, lastMonth: AbbreviatedMonthsType, currentMonth: AbbreviatedMonthsType },
): RecordAgeStatusKey => {
  if (currentMonth === month) {
    return 'currentMonth';
  }
  if (lastMonth === month) {
    return 'lastMonth';
  }
  return 'olderRecords';
};

export const updateRecordPaymentStatus = ({ record, expensesIds, paid }: { record: RecordRedux, expensesIds: string[], paid: boolean }) => {
  if (expensesIds.includes(record._id)) {
    return { ...record, isPaid: paid };
  }
  return record;
};

export const updateEditedRecordStatus = ({
  record, expensesIds, oldExpensesIds,
}: { record: RecordRedux, expensesIds: string[], oldExpensesIds: string[] }) => {
  if (expensesIds.includes(record._id)) {
    return { ...record, isPaid: true };
  }
  if (oldExpensesIds.includes(record._id)) {
    return { ...record, isPaid: false };
  }
  return record;
};
