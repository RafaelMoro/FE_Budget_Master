import { Typography } from '@mui/material';
import { Header } from '../../components/templates';
import { Budget } from '../../components/UI/Budget';
import { BudgetList, Main } from './BudgetsPage.styled';
import { currentBudget } from '../../components/UI/Budget/Budget.mocks';

const BudgetsPage = () => (
  <Main>
    <Header />
    <Typography variant="h2" align="center">Budgets:</Typography>
    <BudgetList>
      <Budget budget={currentBudget} />
    </BudgetList>
  </Main>
);

export { BudgetsPage };
