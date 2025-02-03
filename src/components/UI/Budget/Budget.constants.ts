import { PeriodBudget, TypeBudget } from '../../../globalInterface';

export const ONE_TIME_BUDGET = 'Presupuesto por única vez';
export const PERIODIC_BUDGET = 'Presupuesto periódico';
export const TYPE_BUDGET_OPTIONS: Record<TypeBudget, string> = {
  'one-time': ONE_TIME_BUDGET,
  periodic: PERIODIC_BUDGET,
};
export const PERIOD_BUDGET_OPTIONS: PeriodBudget[] = ['weekly', 'bi-weekly', 'montly', 'daily', 'yearly'];
