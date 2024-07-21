import { Budget, GeneralResponse } from '../../../globalInterface';

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
