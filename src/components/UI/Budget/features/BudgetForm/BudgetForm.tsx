/* eslint-disable react/no-unstable-nested-components */
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useRef, useState } from 'react';

import {
  CreateBudgetValues, BudgetDetailsViewValues, GoNextProps, BudgetPeriodViewValues,
  GoBackBudgetPeriodViewProps,
  CreateBudgetValuesApiRequest,
} from '../../Budget.interface';
import { useBudgets } from '../../../../../hooks/useBudgets/useBudgets';
import { BUDGETS_ROUTE } from '../../../../../pages/RoutesConstants';
import { formatCurrencyToNumber } from '../../../../../utils';
import { useAnimateBox } from '../../../../../hooks';

import { BudgetDetailsView } from './BudgetDetailsView';
import { BudgetPeriodView } from './BudgetPeriodView';
import {
  ErrorResultFormAnimated, LoadingFormAnimated, ResultFormAnimated, SuccessResultFormAnimated,
} from '../../../../templates';

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
    direction, counterView, goPreviousView, goNextView, getFinalResult, resetCounterView,
  } = useAnimateBox();
  const { isLoadingCreateBudget, isErrorCreateBudget, createBudget } = useBudgets();
  const formData = useRef<CreateBudgetValues>(initialValues);
  const [isPeriodic, setIsPeriodic] = useState(false);
  const togglePeriodic = () => setIsPeriodic((prevState) => !prevState);

  const handleSubmit = async (values: CreateBudgetValues) => {
    // Format values to be sent to the API
    const newValues: CreateBudgetValuesApiRequest = {
      ...values,
      startDate: values.startDate.toDate(),
      endDate: values.endDate.toDate(),
      currentAmount: formatCurrencyToNumber(values.currentAmount),
      limit: formatCurrencyToNumber(values.limit),
      nextResetDate: values.endDate.toDate(),
    };

    await createBudget({ values: newValues });

    setTimeout(() => {
      getFinalResult();
    }, 3000);
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
      <LoadingFormAnimated text="Your budget is being created. Please wait..." order={2} counterView={counterView} direction={direction} />
      { (!isLoadingCreateBudget) && (
      <ResultFormAnimated
        counterView={counterView}
        direction={direction}
        order={3}
        isError={isErrorCreateBudget}
        onError={
              () => (
                <ErrorResultFormAnimated
                  redirectRoute={BUDGETS_ROUTE}
                  secondaryButtonText="Go to Budgets"
                  primaryButtonText="Try Again"
                  error="Oops! An error ocurred while creating your budget. Please try again later."
                  resetCounterView={resetCounterView}
                />
              )
            }
        onSuccess={() => (
          <SuccessResultFormAnimated
            title="Your budget has being created."
            buttonText="Go to Budgets"
            redirectRoute={BUDGETS_ROUTE}
          />
        )}
      />
      )}
    </>
  );
};

export { BudgetForm };
