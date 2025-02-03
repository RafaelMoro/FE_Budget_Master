import { Field, Formik } from 'formik';
import { FormControl, InputLabel } from '@mui/material';
import { useRef } from 'react';

import { BudgetSchema } from '../../../../../validationsSchemas/budget.schema';
import { BUDGETS_ROUTE } from '../../../../../pages/RoutesConstants';
import { BudgetDetailsViewProps, BudgetDetailsViewValues } from '../../Budget.interface';
import { TYPE_BUDGET_OPTIONS } from '../../Budget.constants';

import { AnimateBox } from '../../../../../animations';
import { CurrencyField } from '../../../../Other';
import { useCurrencyField } from '../../../../Other/CurrencyField/useCurrencyField';
import { FormContainer } from '../../Budget.styled';
import {
  AnchorButton, CancelButton, FlexContainer, InputForm, MenuItem, PrimaryButton,
} from '../../../../../styles';
import { SelectFormik } from '../../../SelectInput/SelectFormik';

const BudgetDetailsView = ({
  data, counterView, direction, goNext, toggleIsPeriodic,
}: BudgetDetailsViewProps) => {
  const {
    name, typeBudget, limit, currentAmount,
  } = data;
  const initialValues: BudgetDetailsViewValues = {
    name,
    typeBudget,
    limit,
    currentAmount,
  };

  const { updateAmount, initialAmount } = useCurrencyField();
  const currentAmountRef = useRef('');
  const updateCurrentAmount = (amount: string) => {
    currentAmountRef.current = amount;
  };

  if (counterView !== 0) return null;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => goNext({ data: values, skipUpdateData: false, shouldSubmitForm: false })}
      validationSchema={BudgetSchema}
      validateOnMount
    >
      {({ submitForm, setFieldValue }) => (
        <AnimateBox direction={direction}>
          <FormContainer>
            <Field
              component={InputForm}
              name="name"
              type="text"
              variant="standard"
              label="Nombre"
            />
            <FormControl variant="standard">
              <InputLabel id="select-type-budget">Tipo de presupuesto</InputLabel>
              <Field
                dataTestId="select-type-budget"
                name="typeBudget"
                component={SelectFormik}
                onClickCb={toggleIsPeriodic}
              >
                {
                Object.entries(TYPE_BUDGET_OPTIONS).map((option) => (
                  <MenuItem key={option[0]} value={option[0]}>{option[1]}</MenuItem>
                ))
              }
              </Field>
            </FormControl>
            <CurrencyField
              setFieldValue={setFieldValue}
              amount={initialAmount.current}
              updateAmount={updateAmount}
              fieldName="limit"
              labelName="Límite del presupuesto"
            />
            <CurrencyField
              setFieldValue={setFieldValue}
              amount={currentAmountRef.current}
              updateAmount={updateCurrentAmount}
              fieldName="currentAmount"
              labelName="Cantidad gastada hasta ahora"
            />
            <FlexContainer justifyContent="space-between">
              <AnchorButton to={BUDGETS_ROUTE}>
                <CancelButton variant="contained" size="medium">Cancelar</CancelButton>
              </AnchorButton>
              <PrimaryButton variant="contained" onClick={submitForm} size="medium">Siguiente</PrimaryButton>
            </FlexContainer>
          </FormContainer>
        </AnimateBox>
      )}
    </Formik>
  );
};

export { BudgetDetailsView };
