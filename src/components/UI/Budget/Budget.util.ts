import { Budget, BudgetUI } from '../../../globalInterface';
import { formatValueToCurrency, transformDateToMonthDay } from '../../../utils';

export function calculateProgress({ limit, currentAmount }: { limit: number, currentAmount: number }) {
  if (currentAmount === 0) return 0;

  const result = ((currentAmount * 100) / limit);
  const resultWithTwoDecimals = result.toFixed(2);
  return Number(resultWithTwoDecimals);
}

export const transformBudgetUI = ({ budgets }: { budgets: Budget[] }): BudgetUI[] => budgets.map((budget) => ({
  ...budget,
  limitFormatted: formatValueToCurrency({ amount: budget.limit }),
  currentAmountFormatted: formatValueToCurrency({ amount: budget.currentAmount }),
  startDateFormatted: transformDateToMonthDay(budget.startDate),
  endDateFormatted: transformDateToMonthDay(budget.endDate),
}));

export const getExpirationMessage = ({ days, month }: { days: number, month: string }) => {
  if (days < -10) {
    return `Expired since ${month}`;
  }
  if (days < 0 && days > -10) {
    return `Expired ${Math.abs(days)} days ago`;
  }
  if (days === 0) {
    return 'Ending today';
  }
  if (days === 1) {
    return 'Ending tomorrow';
  }
  return `${days} days left`;
};
