import { useEffect, useState } from 'react';
import { Drawer } from '@mui/material';

import { useAppSelector } from '../../../redux/hooks';
import { BudgetUI } from '../../../globalInterface';
import { calculateProgress } from './Budget.util';
import { BudgetDetailsDrawer } from './features/BudgetDetailsDrawer';
import { ProgressBudget } from './features/ProgressBudget';
import {
  BudgetContainer, TextTwoColumns,
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
    limit,
    currentAmount,
    currentAmountFormatted,
    limitFormatted,
    startDateFormatted,
    endDateFormatted,
  } = budget;
  const windowSize = useAppSelector((state) => state.userInterface.windowSize);
  const isMobile = windowSize === 'Mobile';
  const dateText = `From ${startDateFormatted} to ${endDateFormatted}`;
  const progress = calculateProgress({ limit, currentAmount });

  const [title, setTitle] = useState(name);
  const [openBudgetDetailsDrawer, setBudgetDetailsDrawer] = useState(false);

  const toggleBudgetDetailsDrawer = () => {
    setBudgetDetailsDrawer((prevState) => !prevState);
  };

  useEffect(() => {
    if (name.length > 50) {
      setTitle(`${name.slice(0, 50)}...`);
    }
  }, [name]);

  return (
    <>
      <BudgetContainer onClick={toggleBudgetDetailsDrawer} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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
