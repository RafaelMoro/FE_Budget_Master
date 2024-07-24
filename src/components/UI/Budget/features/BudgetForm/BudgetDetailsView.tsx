import { Field, Formik } from 'formik';
import { useRef } from 'react';

import { BudgetSchema } from '../../../../../validationsSchemas/budget.schema';
import { BUDGETS_ROUTE } from '../../../../../pages/RoutesConstants';
import { BudgetDetailsViewProps, BudgetDetailsViewValues } from '../../Budget.interface';
import { TYPE_BUDGET_OPTIONS } from '../../Budget.constants';

import { AnimateBox } from '../../../../../animations';
import { CurrencyField } from '../../../../Other';
import { useCurrencyField } from '../../../../Other/CurrencyField/useCurrencyField';
import { SelectInput } from '../../../SelectInput';
import { FormContainer } from '../../Budget.styled';
import {
  AnchorButton, CancelButton, FlexContainer, InputForm, PrimaryButton,
} from '../../../../../styles';

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
              label="Name"
            />
            <SelectInput
              labelId="select-type-budget"
              dataTestId="select-type-budget"
              labelName="Type of budget"
              fieldName="typeBudget"
              onClickCb={toggleIsPeriodic}
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
              amount={currentAmountRef.current}
              updateAmount={updateCurrentAmount}
              fieldName="currentAmount"
              labelName="Current amount"
            />
            <FlexContainer justifyContent="space-between">
              <AnchorButton to={BUDGETS_ROUTE}>
                <CancelButton variant="contained" size="medium">Cancel</CancelButton>
              </AnchorButton>
              <PrimaryButton variant="contained" onClick={submitForm} size="medium">Next</PrimaryButton>
            </FlexContainer>
          </FormContainer>
        </AnimateBox>
      )}
    </Formik>
  );
};

export { BudgetDetailsView };
