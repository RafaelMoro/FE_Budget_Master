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
      <BudgetList />
    </Main>
  );
};

export { BudgetsPage };
