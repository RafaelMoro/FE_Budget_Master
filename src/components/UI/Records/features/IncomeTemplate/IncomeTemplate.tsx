import { useEffect, useState } from 'react';
import { Drawer } from '@mui/material';
import { Formik } from 'formik';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import dayjs from 'dayjs';

import { useGuestUser, useRecords } from '../../../../../hooks';
import { useAppSelector } from '../../../../../redux/hooks';
import { useCurrencyField } from '../../../../Other/CurrencyField/useCurrencyField';
import { RecordTemplateProps } from '../RecordTemplate/interface';
import { ExpensePaid } from '../../../../../globalInterface';
import { CreateRecordValues } from '../../interface';
import { CreateRecordSchema } from '../../../../../validationsSchemas/records.schema';
import { FormContainer, SecondaryButtonForm } from '../RecordTemplate/RecordTemplate.styled';
import { TransactionFormFields } from '../TransactionFormFields';
import { ShowExpenses } from '../ShowExpenses';
import { FlexContainer } from '../../../../../styles';
import { ActionButtonPanel } from '../../../../templates';
import { DASHBOARD_ROUTE } from '../../../../../pages/RoutesConstants';
import { scrollToTop } from '../../../../../utils/ScrollToTop';

import { SelectExpenses } from '../SelectExpenses';
import { resetLocalStorageWithUserOnly, symmetricDifferenceExpensesRelated } from '../../../../../utils';
import { EditIncomeProps } from '../../../../../hooks/useRecords/interface';

dayjs.extend(utc);
dayjs.extend(timezone);

const IncomeTemplate = ({ edit = false, typeOfRecord }: RecordTemplateProps) => {
  const {
    createIncome,
    editIncome,
    editIncomeLocalStorage,
    createExpenseIncomeLocalStorage,
    isLoadingCreateIncome,
    isLoadingEditIncome,
    isSucessCreateIncome,
    isSucessEditIncome,
  } = useRecords({});
  const { isGuestUser } = useGuestUser();
  const loadingMutation = isLoadingCreateIncome || isLoadingEditIncome;
  const successMutation = isSucessCreateIncome || isSucessEditIncome;
  const { initialAmount, updateAmount, verifyAmountEndsPeriod } = useCurrencyField();

  const recordToBeEdited = useAppSelector((state) => state.records.recordToBeModified);
  const selectedAccount = useAppSelector((state) => state.accounts.accountSelected);

  const action: string = edit ? 'Edit' : 'Create';
  const categoryToBeEdited = recordToBeEdited?.category ?? null;
  const isCredit = selectedAccount?.accountType === 'Credit';
  const [showExpenses, setShowExpenses] = useState<boolean>(false);
  const [expensesSelected, setExpensesSelected] = useState<ExpensePaid[]>([]);
  const [initialValues, setInitialValues] = useState<CreateRecordValues>({
    amount: '',
    shortName: '',
    description: '',
    category: '',
    subCategory: '',
    // If is credit, the prop is false, otherwise it's true because only credit is paid later.
    isPaid: !isCredit,
    date: dayjs().tz('America/Mexico_City'),
    tag: [],
    budgets: [],
  });
  // This data is not included in initial values because are not part of the main form, hence, the data will be empty.
  const updateTags = ({ values, newChips }: { values: CreateRecordValues, newChips: string[] }) => {
    setInitialValues({ ...values, tag: newChips });
  };

  const updateBudgets = ({ values, newBudgets }: { values: CreateRecordValues, newBudgets: string[] }) => {
    setInitialValues({ ...values, budgets: newBudgets });
  };

  const showExpenseText = expensesSelected.length === 0 ? 'Add Expense' : 'Add or Remove Expense';
  const buttonText = `${action} record`;

  // Update edit data to the initial values
  useEffect(() => {
    if (edit && recordToBeEdited) {
      const newInitialValues: CreateRecordValues = {
        amount: String(recordToBeEdited.amount),
        shortName: recordToBeEdited.shortName,
        description: recordToBeEdited.description,
        category: recordToBeEdited.category.categoryName,
        subCategory: recordToBeEdited.subCategory,
        isPaid: recordToBeEdited.isPaid ?? !isCredit,
        date: dayjs(recordToBeEdited.date),
        tag: recordToBeEdited.tag,
        budgets: recordToBeEdited.budgets,
      };
      initialAmount.current = String(recordToBeEdited.amount);

      // If the income has expenses paid, update it.
      const expensesPaid = (recordToBeEdited?.expensesPaid ?? []) as ExpensePaid[];
      if (expensesPaid.length > 0) {
        setExpensesSelected(expensesPaid);
      }

      setInitialValues(newInitialValues);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordToBeEdited?.category.categoryName, edit, isCredit]);

  const toggleShowExpenses = (values: CreateRecordValues) => {
    // save initial values
    setInitialValues(values);
    setShowExpenses((prevState) => !prevState);
  };
  const closeShowExpenses = () => setShowExpenses(false);
  const addExpenseToIncome = (expenses: ExpensePaid[]) => setExpensesSelected(expenses);

  const handleSubmit = (values: CreateRecordValues) => {
    // Flag to know if amount has a different value from the initial value. If so, the query to update account amount will be executed.
    let amountTouched = false;
    if (recordToBeEdited?.amount !== Number(initialAmount.current)) {
      amountTouched = true;
    }
    const newAmount = verifyAmountEndsPeriod(initialAmount.current);

    const {
      isPaid, amount, ...restValues
    } = values;
    const amountToNumber = Number(newAmount);
    const newValues = {
      ...restValues,
      amount: amountToNumber,
      indebtedPeople: [],
      expensesPaid: expensesSelected,
      account: (selectedAccount?._id ?? ''),
      typeOfRecord: 'income',
    };

    if (edit) {
      const expensesPaid = newValues?.expensesPaid;
      // Format expenses as the new expenses selected are type ExpensePaid but the old ones are type ExpensePaidRedux
      const expensesPaidFormatted = expensesPaid.map((expense) => {
        if (typeof expense.date === 'string') {
          return { ...expense, date: new Date(expense.date) };
        }
        return expense;
      });
      const formattedValues = { ...newValues, expensesPaid: expensesPaidFormatted };
      const recordId = recordToBeEdited?._id ?? '';
      const previousAmount = recordToBeEdited?.amount ?? 0;
      const previousExpensesRelated = recordToBeEdited?.expensesPaid ?? [];
      const userIdRecord = recordToBeEdited?.userId ?? '';

      // Do symmetric difference to know what expenses should be edited as unpaid and what new records should be edited as paid.
      const { oldRecords } = symmetricDifferenceExpensesRelated(previousExpensesRelated, expensesSelected);
      const payload: EditIncomeProps = {
        values: formattedValues,
        recordId,
        amountTouched,
        previousAmount,
        previousExpensesRelated: oldRecords,
        userId: userIdRecord,
        accountId: (selectedAccount?._id ?? ''),
      };
      if (isGuestUser) {
        editIncomeLocalStorage(payload);
        return;
      }
      resetLocalStorageWithUserOnly();
      editIncome(payload);
      return;
    }
    if (isGuestUser) {
      createExpenseIncomeLocalStorage(newValues);
      return;
    }
    createIncome(newValues);
  };

  const handleSubmitOnCreate = (values: CreateRecordValues) => {
    const newAmount = verifyAmountEndsPeriod(initialAmount.current);
    const amountToNumber = Number(newAmount);
    const {
      isPaid, amount, ...restValues
    } = values;
    const newValues = {
      ...restValues,
      amount: amountToNumber,
      indebtedPeople: [],
      expensesPaid: expensesSelected,
      account: (selectedAccount?._id ?? ''),
      typeOfRecord: 'income',
    };

    if (isGuestUser) {
      createExpenseIncomeLocalStorage(newValues);
      return;
    }
    createIncome(newValues);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={CreateRecordSchema}
        enableReinitialize
        validateOnMount
      >
        {({
          submitForm, errors, touched, values, setFieldValue,
        }) => {
          const hasErrors = Object.keys(errors).length > 0;
          return (
            <FormContainer>
              <TransactionFormFields<CreateRecordValues>
                values={values}
                amount={values.amount}
                updateAmount={updateAmount}
                typeOfRecord={typeOfRecord}
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
                categoryToBeEdited={categoryToBeEdited}
                updateBudgets={updateBudgets}
                updateTags={updateTags}
                tags={initialValues.tag}
                budgets={initialValues.budgets}
              />
              { (typeOfRecord === 'income' && isCredit) && (
              <>
                <ShowExpenses usePagination expenses={expensesSelected} />
                <FlexContainer justifyContent="center">
                  <SecondaryButtonForm variant="contained" onClick={() => toggleShowExpenses(values)} size="medium">
                    {showExpenseText}
                  </SecondaryButtonForm>
                </FlexContainer>
              </>
              ) }
              <ActionButtonPanel
                routeCancelButton={DASHBOARD_ROUTE}
                minWidthNumber="18"
                actionDataTestId="create-edit-record-button"
                submitButtonText={buttonText}
                loading={loadingMutation}
                success={successMutation}
                disableSubmitButton={loadingMutation || successMutation}
                submitForm={() => {
                  if (hasErrors) {
                    scrollToTop();
                    submitForm();
                    return;
                  }
                  submitForm();
                }}
              />
            </FormContainer>
          );
        }}
      </Formik>
      <Drawer anchor="right" open={showExpenses} onClose={closeShowExpenses}>
        <SelectExpenses modifySelectedExpenses={addExpenseToIncome} selectedExpenses={expensesSelected} closeDrawer={closeShowExpenses} />
      </Drawer>
    </>
  );
};

export { IncomeTemplate };
