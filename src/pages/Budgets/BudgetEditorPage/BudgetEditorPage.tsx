import { useLocation, useNavigate } from 'react-router-dom';

import { BUDGETS_ROUTE } from '../../RoutesConstants';
import { AppIcon } from '../../../components/UI/Icons';
import { BudgetForm } from '../../../components/UI/Budget/features';
import { CreateBudgeTitle, GoBackIconButton, Main } from './BudgetEditorPage.styled';

const BudgetEditorPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const budgetToModify = location.state?.budget;
  const handleGoBack = () => navigate(BUDGETS_ROUTE);

  return (
    <Main>
      <GoBackIconButton aria-label="go-back-button" onClick={handleGoBack}>
        <AppIcon icon="Close" />
      </GoBackIconButton>
      <CreateBudgeTitle align="center" variant="h1">Create budget: </CreateBudgeTitle>
      <BudgetForm budget={budgetToModify} />
    </Main>
  );
};

export { BudgetEditorPage };
