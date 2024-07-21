import { Typography } from '@mui/material';
import { Header } from '../../components/templates';
import { Budget } from '../../components/UI/Budget';
import { BudgetList, Main } from './BudgetsPage.styled';
import { currentBudget, periodicBudget } from '../../components/UI/Budget/Budget.mocks';
import { useSyncLoginInfo } from '../../hooks';

const BudgetsPage = () => {
  useSyncLoginInfo();

  return (
    <Main>
      <Header />
      <Typography variant="h2" align="center">Budgets:</Typography>
      <BudgetList>
        <Budget budget={currentBudget} />
        <Budget budget={periodicBudget} />
      </BudgetList>
    </Main>
  );
};

export { BudgetsPage };
