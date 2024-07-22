import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Field, Formik } from 'formik';

import { CreateBudgetValues } from '../../Budget.interface';
import { CreateBudgetSchema } from '../../../../../validationsSchemas/budget.schema';
import { InputForm, PrimaryButton } from '../../../../../styles';
import { FormContainer } from '../../Budget.styled';

dayjs.extend(utc);
dayjs.extend(timezone);

const BudgetForm = () => {
  const initialValues: CreateBudgetValues = {
    name: '',
    typeBudget: 'one-time',
    description: '',
    startDate: dayjs().tz('America/Mexico_City'),
    endDate: dayjs().tz('America/Mexico_City'),
    limit: 0,
    currentAmount: 0,
    period: 'bi-weekly',
    nextResetDate: dayjs().tz('America/Mexico_City'),
    isActive: true,
    previousPeriods: [],
  };

  const handleSubmit = (values: CreateBudgetValues) => {
    // eslint-disable-next-line no-console
    console.log('values', values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleSubmit(values)}
      validationSchema={CreateBudgetSchema}
      enableReinitialize
      validateOnMount
    >
      {({ submitForm }) => (
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
          <PrimaryButton onSubmit={submitForm}>Create budget</PrimaryButton>
        </FormContainer>
      )}
    </Formik>
  );
};

export { BudgetForm };
