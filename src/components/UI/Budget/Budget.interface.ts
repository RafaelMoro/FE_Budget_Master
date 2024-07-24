import { Dayjs } from 'dayjs';
import {
  Budget, GeneralResponse, PeriodBudget, TypeBudget,
} from '../../../globalInterface';

export interface ProgressProps {
  hasProgressMedium: boolean;
  hasProgressHigh: boolean;
}

export interface ContentPlaceholderProps {
  isTwoColumns: boolean;
}

export interface BudgetsResponse extends Omit<GeneralResponse, 'data'> {
  data: {
    budgets: Budget[];
  };
}

export interface CreateBudgetValues {
  name: string;
  typeBudget: TypeBudget;
  description: string;
  startDate: Dayjs;
  endDate: Dayjs;
  limit: string;
  currentAmount: string;
  period: PeriodBudget;
  nextResetDate: Dayjs;
  isActive: boolean;
  previousPeriods: string[];
}

export interface CreateBudgetValuesApiRequest extends Omit<
CreateBudgetValues,
'startDate' | 'endDate' | 'nextResetDate' | 'limit' | 'currentAmount'
> {
  startDate: Date;
  endDate: Date;
  nextResetDate: Date;
  limit: number;
  currentAmount: number;
}

export interface DeleteBudgetValues {
  budgetId: string;
}

export interface BudgetDetailsViewValues {
  name: string;
  typeBudget: TypeBudget;
  limit: string;
  currentAmount: string;
}

export interface BudgetPeriodViewValues {
  description: string;
  startDate: Dayjs;
  endDate: Dayjs;
  nextResetDate: Dayjs;
  period: PeriodBudget;
  isActive: boolean;
  previousPeriods: string[];
}

export interface GoNextProps {
  data: BudgetDetailsViewValues | BudgetPeriodViewValues;
  skipUpdateData: boolean;
  shouldSubmitForm: boolean;
}

export interface GoBackBudgetPeriodViewProps {
  data: BudgetPeriodViewValues;
}

export interface BudgetDetailsViewProps {
  data: CreateBudgetValues;
  counterView: number;
  direction: number;
  goNext: (props: GoNextProps) => void;
  toggleIsPeriodic: () => void;
}

export interface BudgetPeriodViewProps {
  data: CreateBudgetValues;
  counterView: number;
  direction: number;
  goNext: (props: GoNextProps) => void;
  // This function persists the data of BudgetPeriodView is the user decides to return to BudgetDetailsView
  goBack: ({ data }: GoBackBudgetPeriodViewProps) => void
  isPeriodic: boolean;
}
