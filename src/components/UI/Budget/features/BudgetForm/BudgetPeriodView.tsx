import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Field, Formik } from 'formik';

import { PERIOD_BUDGET_OPTIONS } from '../../Budget.constants';
import { BudgetPeriodViewProps, BudgetPeriodViewValues } from '../../Budget.interface';

import { AnimateBox } from '../../../../../animations';
import { SelectInput } from '../../../SelectInput';
import { DatePickerValue } from '../../../DatePickerValue';
import { FormContainer } from '../../Budget.styled';
import {
  CancelButton, ErrorParagraphValidation, FlexContainer, InputForm, PrimaryButton,
} from '../../../../../styles';

dayjs.extend(utc);
dayjs.extend(timezone);

const BudgetPeriodView = ({
  data, direction, counterView, isPeriodic, isEditBudget, goBack, goNext,
}: BudgetPeriodViewProps) => {
  const {
    description, startDate, endDate, period, nextResetDate, isActive, previousPeriods,
  } = data;
  const initialValues: BudgetPeriodViewValues = {
    description,
    startDate,
    endDate,
    period,
    nextResetDate,
    isActive,
    previousPeriods,
  };
  const textButton = isEditBudget ? 'Editar' : 'Crear';

  // The validate function receives automatically the value of the field
  const validateEndDate = (endDateRceived: Dayjs) => {
    let error;
    const todayDate = dayjs().tz('America/Mexico_City');
    const differenceTodaysDate = endDateRceived.diff(todayDate, 'days');

    if (differenceTodaysDate < 0) {
      error = 'La fecha de término no puede ser hoy. Elija una fecha posterior.';
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
      {({
        submitForm, errors, setFieldValue, values,
      }) => (
        <AnimateBox direction={direction}>
          <FormContainer>
            <Field
              component={InputForm}
              name="description"
              type="text"
              variant="standard"
              label="Descripción (Opcional)"
            />
            { (isPeriodic) && (
            <SelectInput
              labelId="select-period-budget"
              dataTestId="select-period-budget"
              labelName="Periodicidad del presupuesto"
              fieldName="period"
              stringOptions={PERIOD_BUDGET_OPTIONS}
            />
            ) }
            <Field
              component={DatePickerValue}
              setFieldValueCb={setFieldValue}
              name="startDate"
              label="Fecha de inicio"
            />
            <Field
              component={DatePickerValue}
              setFieldValueCb={setFieldValue}
              name="endDate"
              label="Fecha de término"
              validate={validateEndDate}
            />
            { (errors.endDate) && (
            <ErrorParagraphValidation variant="subText">{errors.endDate as string}</ErrorParagraphValidation>
            ) }
            <FlexContainer justifyContent="space-between">
              <CancelButton variant="contained" onClick={() => goBack({ data: values })} size="medium">Regresar</CancelButton>
              <PrimaryButton variant="contained" onClick={submitForm} size="medium">{textButton}</PrimaryButton>
            </FlexContainer>
          </FormContainer>
        </AnimateBox>
      )}
    </Formik>
  );
};

export { BudgetPeriodView };
