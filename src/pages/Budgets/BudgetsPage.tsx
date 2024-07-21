import { Typography } from '@mui/material';
import { Header } from '../../components/templates';
import { Main } from './BudgetsPage.styled';
import { useResizeWindow, useSyncLoginInfo } from '../../hooks';
import { BudgetList } from '../../components/UI/Budget/features';

const BudgetsPage = () => {
  useSyncLoginInfo();
  useResizeWindow();

  return (
    <Main>
      <Header />
      <Typography variant="h2" align="center">Budgets:</Typography>
      <BudgetList />
    </Main>
  );
};

export { BudgetsPage };
