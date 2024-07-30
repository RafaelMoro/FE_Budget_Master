import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { FlexContainer, SecondaryButton } from '../../../styles';
import { BUDGET_EDITOR_PAGE_ROUTE } from '../../../pages/RoutesConstants';

const NoBudgetsCreatedForRecords = () => {
  const navigate = useNavigate();
  const goToCreateBudget = () => navigate(BUDGET_EDITOR_PAGE_ROUTE);

  return (
    <FlexContainer flexDirection="column" justifyContent="center" alignItems="center" gap={3}>
      <Typography variant="body2">You have not created your budgets yet. If you want to add this expense into a budget, first create one.</Typography>
      <SecondaryButton onClick={goToCreateBudget}>Create Budget</SecondaryButton>
    </FlexContainer>
  );
};

export { NoBudgetsCreatedForRecords };
