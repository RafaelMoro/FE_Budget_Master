import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Field, Formik } from 'formik';
import { useRef } from 'react';

import { PERIOD_BUDGET_OPTIONS, TYPE_BUDGET_OPTIONS } from '../../Budget.constants';
import { CreateBudgetValues } from '../../Budget.interface';
import { CreateBudgetSchema } from '../../../../../validationsSchemas/budget.schema';

import { FormContainer } from '../../Budget.styled';
import { useCurrencyField } from '../../../../Other/CurrencyField/useCurrencyField';
import { CurrencyField } from '../../../../Other';
import { SelectInput } from '../../../SelectInput';
import { DatePickerValue } from '../../../DatePickerValue';
import {
  ErrorParagraphValidation,
  InputForm, PrimaryButton,
} from '../../../../../styles';

dayjs.extend(utc);
dayjs.extend(timezone);

const BudgetForm = () => {
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
  const { updateAmount, initialAmount } = useCurrencyField();
  const currentAmount = useRef('');
  const updateCurrentAmount = (amount: string) => {
    currentAmount.current = amount;
  };

  // The validate function receives automatically the value of the field
  const validateEndDate = (endDate: Dayjs) => {
    let error;
    const todayDate = dayjs().tz('America/Mexico_City');
    const differenceTodaysDate = endDate.diff(todayDate, 'days');

    if (differenceTodaysDate < 0) {
      error = 'The end date cannot be before today';
      return error;
    }
    return error;
  };

  const handleSubmit = async (values: CreateBudgetValues) => {
    const newValues = { ...values, nextResetDate: values.endDate };
    // eslint-disable-next-line no-console
    console.log(newValues);

    // Transform limit and amount into number
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleSubmit(values)}
      validationSchema={CreateBudgetSchema}
      validateOnMount
    >
      {({
        submitForm, errors, setFieldValue,
      }) => (
        <FormContainer>
          <Field
            component={DatePickerValue}
            setFieldValueCb={setFieldValue}
            name="startDate"
            label="Start date"
          />
          <Field
            component={DatePickerValue}
            setFieldValueCb={setFieldValue}
            name="endDate"
            label="End date"
            validate={validateEndDate}
          />
          { (errors.endDate) && (
            <ErrorParagraphValidation variant="subText">{errors.endDate as string}</ErrorParagraphValidation>
          ) }
          <Field
            component={InputForm}
            name="name"
            type="text"
            variant="standard"
            label="Name"
          />
          <CurrencyField
            setFieldValue={setFieldValue}
            amount={initialAmount.current}
            updateAmount={updateAmount}
            fieldName="limit"
            labelName="Budget limit"
          />
          <CurrencyField
            setFieldValue={setFieldValue}
            amount={currentAmount.current}
            updateAmount={updateCurrentAmount}
            fieldName="currentAmount"
            labelName="Current amount"
          />
          <Field
            component={InputForm}
            name="description"
            type="text"
            variant="standard"
            label="Description (Optional)"
          />
          <SelectInput
            labelId="select-type-budget"
            dataTestId="select-type-budget"
            labelName="Type of budget"
            fieldName="typeBudget"
            stringOptions={TYPE_BUDGET_OPTIONS}
          />
          <SelectInput
            labelId="select-period-budget"
            dataTestId="select-period-budget"
            labelName="Periodicity of the budget"
            fieldName="period"
            stringOptions={PERIOD_BUDGET_OPTIONS}
          />
          <PrimaryButton onClick={submitForm}>Create budget</PrimaryButton>
        </FormContainer>
      )}
    </Formik>
  );
};

export { BudgetForm };
