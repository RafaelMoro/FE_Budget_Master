import dayjs from 'dayjs';
import { Budget, BudgetUI } from '../../../globalInterface';
import { formatValueToCurrency, getMonth, transformDateToMonthDay } from '../../../utils';

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
  month: getMonth(budget.startDate),
}));

export const getExpirationMessage = ({ days, month, endDateParam }: { days: number, month: string, endDateParam: string }) => {
  const endDate = dayjs(endDateParam);
  const hour = endDate.get('hour');
  const minute = endDate.get('minute');

  if (days < -10) {
    return `Expirado desde ${month}`;
  }
  if (days < 0 && days > -10) {
    return `Expirado ${Math.abs(days)} días atrás`;
  }
  if (days === 0) {
    return `Expirando hoy a las ${hour}:${minute}`;
  }
  if (days === 1) {
    return `Expirando mañana a las ${hour}:${minute}`;
  }
  return `${days} days left`;
};
