/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from 'react';
import { Drawer } from '@mui/material';
import { Formik, Field } from 'formik';
import { Switch } from 'formik-mui';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import dayjs from 'dayjs';

/** Constants, atoms, interfaces, hooks */
import { RecordTemplateProps } from './interface';
import { CreateRecordValues, ExpenseBudget } from '../../interface';
import { ExpensePaid, IndebtedPeople } from '../../../../../globalInterface';
import { DASHBOARD_ROUTE } from '../../../../../pages/RoutesConstants';
import { useRecords } from '../../../../../hooks/useRecords/useRecords';
import { useIndebtedPeople } from '../../../../../hooks/useIndebtedPeople';
import { useAppSelector } from '../../../../../redux/hooks';
import { useCurrencyField } from '../../../../Other/CurrencyField/useCurrencyField';

/** Components */
import { TransactionFormFields } from '../TransactionFormFields';
import { ActionButtonPanel, NoBudgetsCreatedForRecords } from '../../../../templates';
import { ShowExpenses } from '../ShowExpenses';
import { SelectExpenses } from '../SelectExpenses';
import { AddIndebtedPerson } from '../AddIndebtedPerson/AddIndebtedPerson';
import { ShowIndebtedPeople } from '../ShowIndebtedPeople';
import {
  FlexContainer, FormControlLabel,
} from '../../../../../styles';

/** Styles */
import {
  FormContainer, ShowIndebtedPeopleContainer, SecondaryButtonForm,
} from './RecordTemplate.styled';

/** Utils */
import { CreateRecordSchema } from '../../../../../validationsSchemas/records.schema';
import { symmetricDifferenceExpensesRelated } from '../../../../../utils';
import { resetLocalStorageWithUserOnly } from '../../../../../utils/LocalStorage';
import { scrollToTop } from '../../../../../utils/ScrollToTop';
import { useGuestUser } from '../../../../../hooks/useGuestUser/useGuestUser';
import { EditExpenseProps, EditIncomeProps } from '../../../../../hooks/useRecords/interface';
import { useLazyFetchBudgetsQuery } from '../../../../../redux/slices/Budgets/budgets.api';
import { SelectBudget } from '../SelectBudget';

dayjs.extend(utc);
dayjs.extend(timezone);

const RecordTemplate = ({ edit = false, typeOfRecord }: RecordTemplateProps) => {
  const {
    createExpense,
    createIncome,
    editExpense,
    editIncome,
    createExpenseIncomeLocalStorage,
    editExpenseLocalStorage,
    editIncomeLocalStorage,
    isLoadingCreateExpense,
    isLoadingCreateIncome,
    isLoadingEditExpense,
    isLoadingEditIncome,
    isSucessCreateExpense,
    isSucessCreateIncome,
    isSucessEditExpense,
    isSucessEditIncome,
  } = useRecords({});
  const { isGuestUser } = useGuestUser();
  const loadingMutation = isLoadingCreateExpense || isLoadingCreateIncome || isLoadingEditExpense || isLoadingEditIncome;
  const successMutation = isSucessCreateExpense || isSucessCreateIncome || isSucessEditExpense || isSucessEditIncome;
  const {
    modal: indebtedPersonModal,
    openModal,
    closeModal,
    indebtedPeople,
    addIndebtedPerson,
    addIndebtedPeopleForEdit,
    deleteIndebtedPerson,
    updateIndebtedPerson,
    personToModify,
    fetchPersonToModify,
    action: indebtedPersonModalAction,
  } = useIndebtedPeople();
  const { initialAmount, updateAmount, verifyAmountEndsPeriod } = useCurrencyField();

  const recordToBeEdited = useAppSelector((state) => state.records.recordToBeModified);
  const selectedAccount = useAppSelector((state) => state.accounts.accountSelected);
  const budgets = useAppSelector((state) => state.budgets.budgets);
  const user = useAppSelector((state) => state.user);
  const bearerToken = user.userInfo?.bearerToken as string;
  const [fetchBudgetsMutation] = useLazyFetchBudgetsQuery();

  const action: string = edit ? 'Edit' : 'Create';
  const categoryToBeEdited = recordToBeEdited?.category ?? null;
  const isCredit = selectedAccount?.accountType === 'Credit';
  const budgetsAvailable: ExpenseBudget[] = useMemo(
    () => (budgets ?? []).map((budget) => ({ budgetId: budget._id, budgetName: budget.name })),
    [budgets],
  );
  const [showExpenses, setShowExpenses] = useState<boolean>(false);
  const [expensesSelected, setExpensesSelected] = useState<ExpensePaid[]>([]);
  const [initialValues, setInitialValues] = useState<CreateRecordValues>({
    amount: '',
    shortName: '',
    description: '',
    category: '',
    subCategory: '',
    // If is credit, the prop is false, otherwise it's true because only credit is paid later.
    // isPaid: !isCredit,
    date: dayjs().tz('America/Mexico_City'),
    tag: [],
    budgets: [],
  });
  // This data is not included in initial values because are not part of the main form, hence, the data will be empty.
  const updateTags = ({ values, newChips }: { values: CreateRecordValues, newChips: string[] }) => {
    setInitialValues({ ...values, tag: newChips });
  };

  // const updateBudgets = ({ values, newBudgets }: { values: CreateRecordValues, newBudgets: string[] }) => {
  //   setInitialValues({ ...values, budgets: newBudgets });
  // };

  const isExpense = typeOfRecord === 'expense';
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
        // isPaid: recordToBeEdited.isPaid ?? !isCredit,
        date: dayjs(recordToBeEdited.date),
        tag: recordToBeEdited.tag,
        budgets: recordToBeEdited.budgets,
      };
      initialAmount.current = String(recordToBeEdited.amount);

      // If the expense has indebted people, update it.
      const newIndebtedPeople = (recordToBeEdited?.indebtedPeople ?? []) as IndebtedPeople[];
      if (newIndebtedPeople.length > 0) {
        // Database saves these with a mongo id. We have to remove it to be able to edit the record.
        const indebtedPeopleWithoutId = newIndebtedPeople.map((person) => {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const { _id, ...restValuesPerson } = person;
          return restValuesPerson;
        });
        addIndebtedPeopleForEdit(indebtedPeopleWithoutId);
      }

      // If the income has expenses paid, update it.
      const expensesPaid = (recordToBeEdited?.expensesPaid ?? []) as ExpensePaid[];
      if (expensesPaid.length > 0) {
        setExpensesSelected(expensesPaid);
      }

      setInitialValues(newInitialValues);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordToBeEdited?.category.categoryName, edit, isCredit]);

  // Fetch budgets if they are not fetched yet
  useEffect(() => {
    if (!budgets && bearerToken) {
      fetchBudgetsMutation({ bearerToken });
    }
  }, [bearerToken, budgets, fetchBudgetsMutation]);

  const openAddPersonModal = (values: any) => {
    // save initial values
    setInitialValues(values);
    openModal();
  };

  const toggleShowExpenses = (values: any) => {
    // save initial values
    setInitialValues(values);
    setShowExpenses(!showExpenses);
  };
  const closeShowExpenses = () => setShowExpenses(false);

  const addExpenseToIncome = (expenses: ExpensePaid[]) => setExpensesSelected(expenses);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (values: any) => {
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
    const newValues = isExpense ? {
      ...values,
      amount: amountToNumber,
      indebtedPeople,
      account: selectedAccount?._id,
      typeOfRecord: 'expense',
      // @TODO: Change this when creating an expense with linked budget
      linkedBudgets: [],
    } : {
      ...restValues,
      amount: amountToNumber,
      indebtedPeople: [],
      expensesPaid: expensesSelected,
      account: selectedAccount?._id,
      typeOfRecord: 'income',
    };

    if (isExpense) {
      if (edit) {
        const recordId = recordToBeEdited?._id ?? '';
        const previousAmount = recordToBeEdited?.amount ?? 0;
        const userIdRecord = recordToBeEdited?.userId ?? '';
        const payload: EditExpenseProps = {
          values: newValues,
          recordId,
          amountTouched,
          previousAmount,
          userId: userIdRecord,
          accountId: (selectedAccount?._id ?? ''),
        };

        if (isGuestUser) {
          editExpenseLocalStorage(payload);
          return;
        }
        resetLocalStorageWithUserOnly();
        editExpense(payload);
        return;
      }
      if (isGuestUser) {
        createExpenseIncomeLocalStorage(newValues);
        return;
      }
      createExpense(newValues);
      return;
    }

    if (edit) {
      const expensesPaid = newValues?.expensesPaid;
      // Format expenses as the new expenses selected are type ExpensePaid but the old ones are type ExpensePaidRedux
      const expensesPaidFormatted = expensesPaid.map((expense: { date: string | Date; }) => {
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
                // updateBudgets={updateBudgets}
                updateTags={updateTags}
                tags={initialValues.tag}
                // budgets={initialValues.budgets}
              />
              { (isCredit && typeOfRecord === 'expense') && (
              <FormControlLabel
                control={(
                  <Field
                    type="checkbox"
                    checked
                    label="Transaction paid (Optional)"
                    name="isPaid"
                    component={Switch}
                  />
              )}
                label="Transaction paid"
              />
              ) }
              { (typeOfRecord === 'expense') && (
              <ShowIndebtedPeopleContainer>
                <ShowIndebtedPeople
                  indebtedPeople={indebtedPeople}
                  deleteIndebtedPerson={deleteIndebtedPerson}
                  modifyIndebtedPerson={fetchPersonToModify}
                />
                <FlexContainer justifyContent="center">
                  <SecondaryButtonForm variant="contained" onClick={() => openAddPersonModal(values)} size="medium">Add Person</SecondaryButtonForm>
                </FlexContainer>
              </ShowIndebtedPeopleContainer>
              ) }
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
              { (typeOfRecord === 'expense' && budgetsAvailable.length === 0) && (
                <NoBudgetsCreatedForRecords />
              )}
              { (typeOfRecord === 'expense' && budgetsAvailable.length > 0) && (
                <SelectBudget budgets={budgetsAvailable} />
              )}
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
      <AddIndebtedPerson
        addPerson={addIndebtedPerson}
        open={indebtedPersonModal}
        onClose={closeModal}
        indebtedPeople={indebtedPeople}
        indebtedPerson={personToModify}
        updatePerson={updateIndebtedPerson}
        modifyAction={indebtedPersonModalAction === 'Modify'}
      />
      <Drawer anchor="right" open={showExpenses} onClose={closeShowExpenses}>
        <SelectExpenses modifySelectedExpenses={addExpenseToIncome} selectedExpenses={expensesSelected} closeDrawer={closeShowExpenses} />
      </Drawer>
    </>
  );
};

export { RecordTemplate };
