import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Field, Formik } from 'formik';
import { useRef } from 'react';

import { CreateBudgetValues } from '../../Budget.interface';
import { CreateBudgetSchema } from '../../../../../validationsSchemas/budget.schema';
import {
  InputForm, PrimaryButton,
} from '../../../../../styles';
import { FormContainer } from '../../Budget.styled';
import { useCurrencyField } from '../../../../Other/CurrencyField/useCurrencyField';
import { CurrencyField } from '../../../../Other';
import { TYPE_BUDGET_OPTIONS } from '../../Budget.constants';
import { SelectInput } from '../../../SelectInput';

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

  const handleSubmit = async (values: CreateBudgetValues) => {
    // eslint-disable-next-line no-console
    console.log(values);

    // Transform limit and amount into number
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleSubmit(values)}
      validationSchema={CreateBudgetSchema}
      enableReinitialize
      validateOnMount
    >
      {({ submitForm, setFieldValue }) => (
        <FormContainer>
          <Field
            component={InputForm}
            name="name"
            type="text"
            variant="standard"
            label="Name"
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
          <PrimaryButton onClick={submitForm}>Create budget</PrimaryButton>
        </FormContainer>
      )}
    </Formik>
  );
};

export { BudgetForm };
