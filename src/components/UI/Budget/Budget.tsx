import { useEffect, useState } from 'react';
import { Drawer } from '@mui/material';

import { useAppSelector } from '../../../redux/hooks';
import { BudgetUI } from '../../../globalInterface';
import { calculateProgress } from './Budget.util';
import { BudgetDetailsDrawer, ProgressBudget } from './features';
import {
  BudgetContainer, BudgetChip, TextTwoColumns,
  Title,
} from './Budget.styled';

interface BudgetProps {
  budget: BudgetUI;
}

const Budget = ({
  budget,
}: BudgetProps) => {
  const {
    name,
    description: budgetDescription,
    typeBudget,
    limit,
    currentAmount,
    currentAmountFormatted,
    limitFormatted,
    startDateFormatted,
    endDateFormatted,
    period,
  } = budget;
  const windowSize = useAppSelector((state) => state.userInterface.windowSize);
  const isMobile = windowSize === 'Mobile';
  const dateText = `From ${startDateFormatted} to ${endDateFormatted}`;
  const progress = calculateProgress({ limit, currentAmount });

  const [title, setTitle] = useState(name);
  const [description, setDescription] = useState(budgetDescription);
  const [openBudgetDetailsDrawer, setBudgetDetailsDrawer] = useState(false);

  const toggleBudgetDetailsDrawer = () => {
    setBudgetDetailsDrawer((prevState) => !prevState);
  };

  useEffect(() => {
    if (name.length > 50) {
      setTitle(`${name.slice(0, 50)}...`);
    }
  }, [name]);

  useEffect(() => {
    if (budgetDescription.length > 115) {
      setDescription(`${budgetDescription.slice(0, 115)}...`);
    }
  }, [budgetDescription]);

  return (
    <>
      <BudgetContainer onClick={toggleBudgetDetailsDrawer}>
        <TextTwoColumns variant="body2" align="center">
          {dateText}
        </TextTwoColumns>
        <Title variant="h4">{title}</Title>
        <TextTwoColumns align="center">
          Limit:
          {' '}
          {limitFormatted}
        </TextTwoColumns>
        <ProgressBudget currentAmountFormatted={currentAmountFormatted} progress={progress} />
        <BudgetChip label={typeBudget} />
        <BudgetChip label={period} />
        <TextTwoColumns>{description}</TextTwoColumns>
      </BudgetContainer>
      <Drawer
        anchor={!isMobile ? 'right' : 'bottom'}
        open={openBudgetDetailsDrawer}
      >
        <BudgetDetailsDrawer progress={progress} dateText={dateText} budget={budget} toggleDrawer={toggleBudgetDetailsDrawer} />
      </Drawer>
    </>
  );
};

export { Budget };
