import { useNavigate } from 'react-router-dom';
import { AppIcon } from '../../../components/UI/Icons';
import { Main } from '../BudgetsPage.styled';
import { GoBackIconButton } from './CreateBudget.styled';
import { BUDGETS_ROUTE } from '../../RoutesConstants';

const CreateBudget = () => {
  const navigate = useNavigate();
  const handleGoBack = () => navigate(BUDGETS_ROUTE);

  return (
    <Main>
      <GoBackIconButton aria-label="sign-out-button" onClick={handleGoBack}>
        <AppIcon icon="Close" />
      </GoBackIconButton>
    </Main>
  );
};

export { CreateBudget };
