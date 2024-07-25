import { List, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { AppIcon } from '../../../Icons';
import { BudgetUI } from '../../../../../globalInterface';
import { getRemainingDays } from '../../../../../utils';
import { ProgressBudget } from '../ProgressBudget';
import { BudgetChip, TextTwoColumns } from '../../Budget.styled';
import {
  BudgetDateDrawer,
  DaysLeftText, DrawerCloseIconButton, DrawerContainer, IconsContainer, Title,
} from './BudgetDetailsDrawer.styled';
import { BUDGET_EDITOR_PAGE_ROUTE } from '../../../../../pages/RoutesConstants';

interface BudgetDetailsDrawerProps {
  budget: BudgetUI;
  dateText: string;
  progress: number;
  toggleDrawer: () => void;
  toggleDeleteModal: () => void;
}

const BudgetDetailsDrawer = ({
  toggleDrawer, budget, dateText, progress, toggleDeleteModal,
}: BudgetDetailsDrawerProps) => {
  const navigate = useNavigate();
  const restingDays = getRemainingDays(budget.endDate);
  const handleEditBudget = () => {
    navigate(BUDGET_EDITOR_PAGE_ROUTE, { state: { budget } });
  };

  return (
    <DrawerContainer>
      <DrawerCloseIconButton onClick={toggleDrawer}>
        <AppIcon icon="Close" />
      </DrawerCloseIconButton>
      <BudgetDateDrawer align="center" variant="body2">{dateText}</BudgetDateDrawer>
      <Title variant="h4">{budget.name}</Title>
      <IconsContainer>
        <IconButton onClick={handleEditBudget}>
          <AppIcon icon="Edit" />
        </IconButton>
        <IconButton onClick={toggleDeleteModal}>
          <AppIcon icon="Delete" />
        </IconButton>
      </IconsContainer>
      <Typography>
        Limit:
        {' '}
        {budget.limitFormatted}
      </Typography>
      <DaysLeftText>
        {restingDays}
        {' '}
        days left
      </DaysLeftText>
      <ProgressBudget currentAmountFormatted={budget.currentAmountFormatted} progress={progress} />
      <TextTwoColumns>{budget.description}</TextTwoColumns>
      <BudgetChip label={budget.typeBudget} />
      <BudgetChip label={budget.period} />
      { /** @TODO: Make every list item as collapsable to see records in budget history */ }
      { (budget.typeBudget === 'periodic' && budget.previousPeriods.length > 0) && (
        <>
          <TextTwoColumns align="center">Previous periods: </TextTwoColumns>
          <List>
            { budget.previousPeriods.map((period) => (
              <Typography key={period}>{period}</Typography>
            )) }
          </List>
        </>
      ) }
    </DrawerContainer>
  );
};

export { BudgetDetailsDrawer };
