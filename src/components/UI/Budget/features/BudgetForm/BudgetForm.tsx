/* eslint-disable react/no-unstable-nested-components */
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useRef, useState } from 'react';

import {
  CreateBudgetValues, BudgetDetailsViewValues, GoNextProps, BudgetPeriodViewValues,
  GoBackBudgetPeriodViewProps,
  CreateBudgetValuesApiRequest,
  EditBudgetValuesApiRequest,
} from '../../Budget.interface';
import { useBudgets } from '../../../../../hooks/useBudgets/useBudgets';
import { BUDGETS_ROUTE } from '../../../../../pages/RoutesConstants';
import { formatCurrencyToNumber, formatValueToCurrency } from '../../../../../utils';
import { useAnimateBox } from '../../../../../hooks';

import { BudgetDetailsView } from './BudgetDetailsView';
import { BudgetPeriodView } from './BudgetPeriodView';
import {
  ErrorResultFormAnimated, LoadingFormAnimated, ResultFormAnimated, SuccessResultFormAnimated,
} from '../../../../templates';
import { BudgetUI } from '../../../../../globalInterface';

dayjs.extend(utc);
dayjs.extend(timezone);

const defaultInitialValues: CreateBudgetValues = {
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

const BudgetForm = ({ budget }: { budget?: BudgetUI }) => {
  const {
    direction, counterView, goPreviousView, goNextView, getFinalResult, resetCounterView,
  } = useAnimateBox();
  const {
    isLoadingCreateBudget, isErrorCreateBudget, createBudget, editBudget,
  } = useBudgets();
  const isEditBudget = !!budget?._id;
  const initialValues = isEditBudget
    ? {
      name: budget.name,
      typeBudget: budget.typeBudget,
      description: budget.description,
      startDate: dayjs(budget.startDate).tz('America/Mexico_City'),
      endDate: dayjs(budget.endDate).tz('America/Mexico_City'),
      limit: formatValueToCurrency({ amount: budget.limit }),
      currentAmount: formatValueToCurrency({ amount: budget.currentAmount }),
      period: budget.period,
      nextResetDate: dayjs(budget.nextResetDate).tz('America/Mexico_City'),
      isActive: budget.isActive,
      previousPeriods: budget.previousPeriods,
    } : defaultInitialValues;
  const formData = useRef<CreateBudgetValues>(initialValues);
  const [isPeriodic, setIsPeriodic] = useState(false);
  const togglePeriodic = () => setIsPeriodic((prevState) => !prevState);

  // Texts
  const loadingText = isEditBudget ? 'Updating your budget. Please wait...' : 'Your budget is being created. Please wait...';
  const action = isEditBudget ? 'updating' : 'creating';
  const actionOnSuccess = isEditBudget ? 'updated' : 'created';

  const handleSubmitOnCreate = async (values: CreateBudgetValues) => {
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

  const handleSubmitOnEdit = async (values: CreateBudgetValues) => {
    if (budget) {
      // Format values to be sent to the API
      const newValues: EditBudgetValuesApiRequest = {
        ...values,
        budgetId: budget._id,
        startDate: values.startDate.toDate(),
        endDate: values.endDate.toDate(),
        currentAmount: formatCurrencyToNumber(values.currentAmount),
        limit: formatCurrencyToNumber(values.limit),
        nextResetDate: values.endDate.toDate(),
      };

      await editBudget({ values: newValues });

      setTimeout(() => {
        getFinalResult();
      }, 3000);
    }
  };

  const handleSubmit = isEditBudget ? handleSubmitOnEdit : handleSubmitOnCreate;

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
        isEditBudget={isEditBudget}
        counterView={counterView}
        direction={direction}
        goBack={goBackBudgetPeriodView}
        goNext={goNext}
      />
      <LoadingFormAnimated text={loadingText} order={2} counterView={counterView} direction={direction} />
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
                  error={`An error occurred while ${action} your budget. Please try again.`}
                  resetCounterView={resetCounterView}
                />
              )
            }
        onSuccess={() => (
          <SuccessResultFormAnimated
            title={`Budget ${actionOnSuccess}`}
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
