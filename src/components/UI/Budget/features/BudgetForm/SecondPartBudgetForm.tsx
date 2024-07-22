import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Field, Formik } from 'formik';
import { AnimateBox } from '../../../../../animations';
import { FormContainer } from '../../Budget.styled';
import { DatePickerValue } from '../../../DatePickerValue';
import {
  CancelButton, ErrorParagraphValidation, InputForm, PrimaryButton,
} from '../../../../../styles';
import { SecondPartBudgetFormProps, SecondPartCreateBudgetValues } from '../../Budget.interface';
import { FormActionButtons } from '../../../../../styles/LoginModule.styled';
import { SelectInput } from '../../../SelectInput';
import { PERIOD_BUDGET_OPTIONS } from '../../Budget.constants';

dayjs.extend(utc);
dayjs.extend(timezone);

const initialValues: SecondPartCreateBudgetValues = {
  description: '',
  startDate: dayjs().tz('America/Mexico_City'),
  endDate: dayjs().tz('America/Mexico_City'),
  period: 'bi-weekly',
  nextResetDate: dayjs().tz('America/Mexico_City'),
  isActive: true,
  previousPeriods: [],
};

const SecondPartBudgetForm = ({
  direction, counterView, goBack, goNext,
}: SecondPartBudgetFormProps) => {
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

  if (counterView !== 1) return null;
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => goNext({ data: values, skipUpdateData: false, shouldSubmitForm: true })}
      validateOnMount
    >
      {({ submitForm, errors, setFieldValue }) => (
        <AnimateBox direction={direction}>
          <FormContainer>
            <Field
              component={InputForm}
              name="description"
              type="text"
              variant="standard"
              label="Description (Optional)"
            />
            <SelectInput
              labelId="select-period-budget"
              dataTestId="select-period-budget"
              labelName="Periodicity of the budget"
              fieldName="period"
              stringOptions={PERIOD_BUDGET_OPTIONS}
            />
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
            <FormActionButtons>
              <CancelButton variant="contained" onClick={goBack} size="medium">Return</CancelButton>
              <PrimaryButton variant="contained" onClick={submitForm} size="medium">Create Budget</PrimaryButton>
            </FormActionButtons>
          </FormContainer>
        </AnimateBox>
      )}
    </Formik>
  );
};

export { SecondPartBudgetForm };
