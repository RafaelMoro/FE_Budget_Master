import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useRef, useState } from 'react';

import {
  CreateBudgetValues, BudgetDetailsViewValues, GoNextProps, BudgetPeriodViewValues,
  GoBackBudgetPeriodViewProps,
} from '../../Budget.interface';
import { useAnimateBox } from '../../../../../hooks';
import { BudgetDetailsView } from './BudgetDetailsView';
import { BudgetPeriodView } from './BudgetPeriodView';

dayjs.extend(utc);
dayjs.extend(timezone);

const initialValues: CreateBudgetValues = {
  name: '',
  typeBudget: 'one-time',
  description: '',
  startDate: dayjs().tz('America/Mexico_City'),
  endDate: dayjs().tz('America/Mexico_City'),
  limit: '',
  currentAmount: '',
  period: 'bi-weekly',
  nextResetDate: dayjs().tz('America/Mexico_City'),
  isActive: true,
  previousPeriods: [],
};

const BudgetForm = () => {
  const {
    direction, counterView, goPreviousView, goNextView,
    // resetCounterView,
  } = useAnimateBox();
  const formData = useRef<CreateBudgetValues>(initialValues);
  const [isPeriodic, setIsPeriodic] = useState(false);
  const togglePeriodic = () => setIsPeriodic((prevState) => !prevState);

  const handleSubmit = async (values: CreateBudgetValues) => {
    const newValues = { ...values, nextResetDate: values.endDate };
    // eslint-disable-next-line no-console
    console.log(newValues);

    // Transform limit and amount into number
  };

  const updateData = (newInfo: BudgetDetailsViewValues | BudgetPeriodViewValues) => {
    const { current } = formData;
    formData.current = { ...current, ...newInfo };
  };

  // This function persists the data of BudgetPeriodView is the user decides to return to BudgetDetailsView
  const goBackBudgetPeriodView = ({ data }: GoBackBudgetPeriodViewProps) => {
    updateData(data);
    goPreviousView();
  };

  const goNext = ({ data, shouldSubmitForm = false, skipUpdateData = true }: GoNextProps) => {
    if (!skipUpdateData) updateData(data);
    if (shouldSubmitForm) handleSubmit(formData.current);
    goNextView();
  };

  return (
    <>
      <BudgetDetailsView
        data={formData.current}
        counterView={counterView}
        direction={direction}
        goNext={goNext}
        toggleIsPeriodic={togglePeriodic}
      />
      <BudgetPeriodView
        data={formData.current}
        isPeriodic={isPeriodic}
        counterView={counterView}
        direction={direction}
        goBack={goBackBudgetPeriodView}
        goNext={goNext}
      />
    </>
  );
};

export { BudgetForm };
