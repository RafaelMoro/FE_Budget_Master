import { Typography } from '@mui/material';
import { Header } from '../../components/templates';
import { Budget } from '../../components/UI/Budget';
import { Main } from './BudgetsPage.styled';
import { currentBudget } from '../../components/UI/Budget/Budget.mocks';

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
