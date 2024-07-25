import { useNavigate } from 'react-router-dom';

import { BUDGETS_ROUTE } from '../../RoutesConstants';
import { BudgetForm } from '../../../components/UI/Budget/features';
import { AppIcon } from '../../../components/UI/Icons';
import { Main } from '../BudgetsPage.styled';
import { CreateBudgeTitle, GoBackIconButton } from '../BudgetEditorPage/BudgetEditorPage.styled';

const EditBudget = () => {
  const navigate = useNavigate();
  const handleGoBack = () => navigate(BUDGETS_ROUTE);

  return (
    <Main>
      <GoBackIconButton aria-label="go-back-button" onClick={handleGoBack}>
        <AppIcon icon="Close" />
      </GoBackIconButton>
      <CreateBudgeTitle align="center" variant="h1">Create budget: </CreateBudgeTitle>
      <BudgetForm />
    </Main>
  );
};

export { EditBudget };
