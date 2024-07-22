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
  limit: number;
  currentAmount: number;
  period: PeriodBudget;
  nextResetDate: Dayjs;
  isActive: boolean;
  previousPeriods: string[];
}
