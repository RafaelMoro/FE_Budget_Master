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

export interface BudgetDetailsViewValues {
  name: string;
  typeBudget: TypeBudget;
  limit: string;
  currentAmount: string;
}

export interface SecondPartCreateBudgetValues {
  description: string;
  startDate: Dayjs;
  endDate: Dayjs;
  nextResetDate: Dayjs;
  period: PeriodBudget;
  isActive: boolean;
  previousPeriods: string[];
}

export interface GoNextProps {
  data: BudgetDetailsViewValues | SecondPartCreateBudgetValues;
  skipUpdateData: boolean;
  shouldSubmitForm: boolean;
}

export interface BudgetDetailsViewProps {
  data: CreateBudgetValues;
  counterView: number;
  direction: number;
  goNext: (props: GoNextProps) => void;
  toggleIsPeriodic: () => void;
}

export interface SecondPartBudgetFormProps {
  counterView: number;
  direction: number;
  goNext: (props: GoNextProps) => void;
  goBack: () => void;
  isPeriodic: boolean;
}
