import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { FlexContainer, SecondaryButton } from '../../../styles';
import { BUDGET_EDITOR_PAGE_ROUTE } from '../../../pages/RoutesConstants';

const NoBudgetsCreatedForRecords = () => {
  const navigate = useNavigate();
  const goToCreateBudget = () => navigate(BUDGET_EDITOR_PAGE_ROUTE);

  return (
    <FlexContainer flexDirection="column" justifyContent="center" alignItems="center" gap={3}>
      <Typography variant="body2">
        No has creado presupuestos todavía. Si quieres añadir este gasto a un presupuesto, primero crea un presupuesto.
      </Typography>
      <SecondaryButton onClick={goToCreateBudget}>Crear presupuesto</SecondaryButton>
    </FlexContainer>
  );
};

export { NoBudgetsCreatedForRecords };
