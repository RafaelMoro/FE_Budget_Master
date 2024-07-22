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

export interface FirstPartCreateBudgetValues {
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
  data: FirstPartCreateBudgetValues | SecondPartCreateBudgetValues;
  skipUpdateData: boolean;
  shouldSubmitForm: boolean;
}

export interface FirstPartBudgetFormProps {
  goNext: (props: GoNextProps) => void;
  counterView: number;
  direction: number;
}

export interface SecondPartBudgetFormProps {
  goNext: (props: GoNextProps) => void;
  goBack: () => void;
  counterView: number;
  direction: number;
}
