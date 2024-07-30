import { List, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
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
import { getExpirationMessage } from '../../Budget.util';

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
  const [restingDaysText, setRestingDaysText] = useState<string>(`${restingDays} days left`);

  useEffect(() => {
    const message = getExpirationMessage({ days: restingDays, month: dateText });
    setRestingDaysText(message);
  }, [dateText, restingDays]);

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
        {restingDaysText}
      </DaysLeftText>
      <ProgressBudget currentAmountFormatted={budget.currentAmountFormatted} progress={progress} />
      <TextTwoColumns>{budget.description}</TextTwoColumns>
      <BudgetChip label={budget.typeBudget} />
      <BudgetChip label={budget.period} />
      { (budget.typeBudget === 'periodic' && budget.previousPeriods?.length > 0) && (
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
