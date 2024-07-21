import { BudgetUI } from '../../../globalInterface';

export const currentBudget: BudgetUI = {
  name: 'Tragadera y demas comida que se me ocurra comprar.',
  description: 'Este es un presupuesto para toda la comida rapida, botana, dulces y alcohol.',
  typeBudget: 'one-time',
  period: 'weekly',
  startDate: new Date('2024-07-20T12:08:00'),
  startDateFormatted: 'Jul 20',
  endDate: new Date('2024-07-27T12:08:00'),
  endDateFormatted: 'Jul 27',
  currentAmount: 200,
  currentAmountFormatted: '$200.00',
  limit: 1000,
  limitFormatted: '$1,000.00',
  isActive: true,
  nextResetDate: new Date('2024-07-27T12:08:00'),
  previousPeriods: [],
};

export const periodicBudget: BudgetUI = {
  name: 'Groceries',
  description: 'This budget is to have control on the amount of money spent on groceries.',
  typeBudget: 'periodic',
  period: 'bi-weekly',
  startDate: new Date('2024-07-20T12:08:00'),
  startDateFormatted: 'Jul 20',
  endDate: new Date('2024-08-03T12:08:00'),
  endDateFormatted: 'Aug 03',
  currentAmount: 634.5,
  currentAmountFormatted: '$634.50',
  limit: 2000,
  limitFormatted: '$2,000.00',
  isActive: true,
  nextResetDate: new Date('2024-08-03T12:08:00'),
  previousPeriods: ['2024-06-22T12:08:00 | 2024-07-06T12:08:00', '2024-07-06T12:08:00 | 2024-07-20T12:08:00'],
};

export const getMockBudget = ({ hasLargeTitle, hasLargeDescription }: { hasLargeTitle?: boolean, hasLargeDescription?: boolean } = {}): BudgetUI => {
  const defaultTitle = 'Fast food and beverages.';
  const largeTitle = 'This is a very long title that should be truncated on the budget when shown.';

  const defaultDescription = 'This budget is to control the amount of money spent in fast food';
  // eslint-disable-next-line max-len
  const largeDescription = "This is a very long description that should be truncated on the budget when shown. Seems like it's still missing some words so the description can be truncated";

  return {
    name: hasLargeTitle ? largeTitle : defaultTitle,
    description: hasLargeDescription ? largeDescription : defaultDescription,
    typeBudget: 'one-time',
    period: 'weekly',
    startDate: new Date('2024-07-20T12:08:00'),
    startDateFormatted: 'Jul 20',
    endDate: new Date('2024-07-27T12:08:00'),
    endDateFormatted: 'Jul 27',
    currentAmount: 200,
    currentAmountFormatted: '$200.00',
    limit: 1000,
    limitFormatted: '$1,000.00',
    isActive: true,
    nextResetDate: new Date('2024-07-27T12:08:00'),
    previousPeriods: [],
  };
};
