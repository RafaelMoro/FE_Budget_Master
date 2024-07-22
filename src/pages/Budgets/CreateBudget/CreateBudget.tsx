import { useNavigate } from 'react-router-dom';

import { BUDGETS_ROUTE } from '../../RoutesConstants';
import { AppIcon } from '../../../components/UI/Icons';
import { BudgetForm } from '../../../components/UI/Budget/features';
import { Main } from '../BudgetsPage.styled';
import { GoBackIconButton } from './CreateBudget.styled';

const CreateBudget = () => {
  const navigate = useNavigate();
  const handleGoBack = () => navigate(BUDGETS_ROUTE);

  return (
    <Main>
      <GoBackIconButton aria-label="sign-out-button" onClick={handleGoBack}>
        <AppIcon icon="Close" />
      </GoBackIconButton>
      <BudgetForm />
    </Main>
  );
};

export { CreateBudget };
