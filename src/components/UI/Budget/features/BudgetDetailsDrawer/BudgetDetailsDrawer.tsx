import { List, Typography } from '@mui/material';
import { AppIcon } from '../../../Icons';
import { BudgetUI } from '../../../../../globalInterface';
import { getRemainingDays } from '../../../../../utils';
import { ProgressBudget } from '../ProgressBudget';
import { BudgetChip, TextTwoColumns } from '../../Budget.styled';
import {
  DaysLeftText, DrawerCloseIconButton, DrawerContainer, Title,
} from './BudgetDetailsDrawer.styled';

interface BudgetDetailsDrawerProps {
  budget: BudgetUI;
  dateText: string;
  progress: number;
  toggleDrawer: () => void;
}

const BudgetDetailsDrawer = ({
  toggleDrawer, budget, dateText, progress,
}: BudgetDetailsDrawerProps) => {
  const restingDays = getRemainingDays(budget.endDate);

  return (
    <DrawerContainer>
      <DrawerCloseIconButton onClick={toggleDrawer}>
        <AppIcon icon="Close" />
      </DrawerCloseIconButton>
      <TextTwoColumns align="center" variant="body2">{dateText}</TextTwoColumns>
      <Title variant="h4">{budget.name}</Title>
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
