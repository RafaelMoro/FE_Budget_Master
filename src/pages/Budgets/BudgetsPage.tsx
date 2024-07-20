import { Typography } from '@mui/material';
import { Header } from '../../components/templates';
import { Budget } from '../../components/UI/Budget';
import { BudgetUI } from '../../globalInterface';
import { Main } from './BudgetsPage.styled';

const currentBudget: BudgetUI = {
  name: 'Tragadera',
  description: '',
  typeBudget: 'one-time',
  period: 'weekly',
  startDate: new Date('2024-07-20T12:08:00'),
  startDateFormatted: 'Jul 20',
  endDate: new Date('2024-07-27T12:08:00'),
  endDateFormatted: 'Jul 27',
  currentAmount: 0,
  currentAmountFormatted: '$0.00',
  limit: 1000,
  limitFormatted: '$1,000.00',
  isActive: true,
  nextResetDate: new Date('2024-07-27T12:08:00'),
  previousPrevious: [],
};

const BudgetsPage = () => (
  <Main>
    <Header />
    <Typography variant="h2" align="center">Budgets:</Typography>
    { /* @TODO: Create Budget container */ }
    <div style={{ marginTop: '2rem', padding: '0 2rem' }}>
      <Budget budget={currentBudget} />
    </div>
  </Main>
);

export { BudgetsPage };
