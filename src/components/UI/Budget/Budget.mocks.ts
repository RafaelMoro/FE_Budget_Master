import { BudgetUI, TypeBudget } from '../../../globalInterface';
import { transformDateToMonthDay } from '../../../utils';

export const currentBudget: BudgetUI = {
  _id: '1',
  __v: 0,
  name: 'Tragadera y demas comida que se me ocurra comprar.',
  description: 'Este es un presupuesto para toda la comida rapida, botana, dulces y alcohol.',
  typeBudget: 'one-time',
  period: 'weekly',
  startDate: '2024-07-20T12:08:00',
  startDateFormatted: 'Jul 20',
  endDate: '2024-07-27T12:08:00',
  endDateFormatted: 'Jul 27',
  currentAmount: 200,
  currentAmountFormatted: '$200.00',
  limit: 1000,
  limitFormatted: '$1,000.00',
  isActive: true,
  nextResetDate: '2024-07-27T12:08:00',
  previousPeriods: [],
};

export const periodicBudget: BudgetUI = {
  _id: '2',
  __v: 0,
  name: 'Groceries',
  description: 'This budget is to have control on the amount of money spent on groceries.',
  typeBudget: 'periodic',
  period: 'bi-weekly',
  startDate: '2024-07-20T12:08:00',
  startDateFormatted: 'Jul 20',
  endDate: '2024-08-03T12:08:00',
  endDateFormatted: 'Aug 03',
  currentAmount: 634.5,
  currentAmountFormatted: '$634.50',
  limit: 2000,
  limitFormatted: '$2,000.00',
  isActive: true,
  nextResetDate: '2024-08-03T12:08:00',
  previousPeriods: ['2024-06-22T12:08:00 | 2024-07-06T12:08:00', '2024-07-06T12:08:00 | 2024-07-20T12:08:00'],
};

interface GetMockBudgetProps {
  hasLargeTitle?: boolean;
  hasLargeDescription?: boolean;
  typeBudget?: TypeBudget;
  previousPeriods?: string[];
}

export const getMockBudget = ({
  hasLargeTitle,
  hasLargeDescription,
  typeBudget = 'one-time',
  previousPeriods = [],
}: GetMockBudgetProps = {}): BudgetUI => {
  const defaultTitle = 'Fast food and beverages.';
  const largeTitle = 'This is a very long title that should be truncated on the budget when shown.';
  const today = new Date();
  const todayString = today.toLocaleString();
  const startDateFormatted = transformDateToMonthDay(todayString);

  const endDate = new Date();
  endDate.setDate(today.getDate() + 7);
  const endDateString = endDate.toLocaleString();
  const endDateFormatted = transformDateToMonthDay(endDateString);

  const defaultDescription = 'This budget is to control the amount of money spent in fast food';
  // eslint-disable-next-line max-len
  const largeDescription = "This is a very long description that should be truncated on the budget when shown. Seems like it's still missing some words so the description can be truncated";

  return {
    _id: '1',
    __v: 0,
    name: hasLargeTitle ? largeTitle : defaultTitle,
    description: hasLargeDescription ? largeDescription : defaultDescription,
    typeBudget,
    period: 'weekly',
    startDate: todayString,
    startDateFormatted,
    endDate: endDateString,
    endDateFormatted,
    currentAmount: 200,
    currentAmountFormatted: '$200.00',
    limit: 1000,
    limitFormatted: '$1,000.00',
    isActive: true,
    nextResetDate: endDateString,
    previousPeriods,
  };
};

export const successfulResponseFetchBudgets = {
  data: {
    budgets: [getMockBudget()],
  },
  error: null,
  message: null,
  success: true,
  version: '2.0.0',
};

export const unsuccessfulResponseFetchBudgets = {
  data: null,
  error: {
    statusCode: 401,
    message: 'Unauthorized',
  },
  message: null,
  success: false,
  version: '2.0.0',
};

export const successfulResponseDeleteBudget = {
  data: {
    budgets: [getMockBudget()],
  },
  error: null,
  message: null,
  success: true,
  version: '2.0.0',
};
