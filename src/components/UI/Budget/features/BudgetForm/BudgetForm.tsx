import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useRef, useState } from 'react';

import {
  CreateBudgetValues, BudgetDetailsViewValues, GoNextProps, SecondPartCreateBudgetValues,
} from '../../Budget.interface';
import { useAnimateBox } from '../../../../../hooks';
import { BudgetDetailsView } from './BudgetDetailsView';
import { SecondPartBudgetForm } from './SecondPartBudgetForm';

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

  const updateData = (newInfo: BudgetDetailsViewValues | SecondPartCreateBudgetValues) => {
    const { current } = formData;
    formData.current = { ...current, ...newInfo };
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
      <SecondPartBudgetForm
        isPeriodic={isPeriodic}
        counterView={counterView}
        direction={direction}
        goBack={goPreviousView}
        goNext={goNext}
      />
    </>
  );
};

export { BudgetForm };
