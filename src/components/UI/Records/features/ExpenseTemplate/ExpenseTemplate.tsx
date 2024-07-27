import { Field, Formik } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import dayjs from 'dayjs';

import { Switch } from 'formik-mui';
import { Drawer } from '@mui/material';
import { CreateRecordValues, ExpenseBudget } from '../../interface';
import { useAppSelector } from '../../../../../redux/hooks';
import { useCurrencyField } from '../../../../Other/CurrencyField/useCurrencyField';
import { useGuestUser, useIndebtedPeople, useRecords } from '../../../../../hooks';
import { RecordTemplateProps } from '../RecordTemplate/interface';
import { EditExpenseProps } from '../../../../../hooks/useRecords/interface';
import { resetLocalStorageWithUserOnly } from '../../../../../utils';
import { CreateRecordSchema } from '../../../../../validationsSchemas/records.schema';
import { FormContainer, SecondaryButtonForm, ShowIndebtedPeopleContainer } from '../RecordTemplate/RecordTemplate.styled';
import { TransactionFormFields } from '../TransactionFormFields';
import { FlexContainer, FormControlLabel } from '../../../../../styles';
import { ShowIndebtedPeople } from '../ShowIndebtedPeople';
import { ActionButtonPanel, NoBudgetsCreatedForRecords } from '../../../../templates';
import { SelectBudget } from '../SelectBudget';
import { DASHBOARD_ROUTE } from '../../../../../pages/RoutesConstants';
import { scrollToTop } from '../../../../../utils/ScrollToTop';
import { AddIndebtedPerson } from '../AddIndebtedPerson/AddIndebtedPerson';
import { SelectExpenses } from '../SelectExpenses';
import { ExpensePaid, IndebtedPeople } from '../../../../../globalInterface';

dayjs.extend(utc);
dayjs.extend(timezone);

const ExpenseTemplate = ({ edit = false, typeOfRecord }: RecordTemplateProps) => {
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
  const {
    createExpense,
    editExpense,
    createExpenseIncomeLocalStorage,
    editExpenseLocalStorage,
    isLoadingCreateExpense,
    isLoadingEditExpense,
    isSucessCreateExpense,
    isSucessEditExpense,
  } = useRecords({});
  const loadingMutation = isLoadingCreateExpense || isLoadingEditExpense;
  const successMutation = isSucessCreateExpense || isSucessEditExpense;
  const { isGuestUser } = useGuestUser();
  const { initialAmount, updateAmount, verifyAmountEndsPeriod } = useCurrencyField();

  const selectedAccount = useAppSelector((state) => state.accounts.accountSelected);
  const recordToBeEdited = useAppSelector((state) => state.records.recordToBeModified);
  const budgets = useAppSelector((state) => state.budgets.budgets);
  const categoryToBeEdited = recordToBeEdited?.category ?? null;
  const isCredit = selectedAccount?.accountType === 'Credit';
  const action: string = edit ? 'Edit' : 'Create';
  const buttonText = `${action} record`;

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
  const budgetsAvailable: ExpenseBudget[] = useMemo(
    () => (budgets ?? []).map((budget) => ({ budgetId: budget._id, budgetName: budget.name })),
    [budgets],
  );

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

  const addExpenseToIncome = (expenses: ExpensePaid[]) => setExpensesSelected(expenses);

  const closeShowExpenses = () => setShowExpenses(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openAddPersonModal = (values: any) => {
    // save initial values
    setInitialValues(values);
    openModal();
  };

  // This data is not included in initial values because are not part of the main form, hence, the data will be empty.
  const updateTags = ({ values, newChips }: { values: CreateRecordValues, newChips: string[] }) => {
    setInitialValues({ ...values, tag: newChips });
  };

  const updateBudgets = ({ values, newBudgets }: { values: CreateRecordValues, newBudgets: string[] }) => {
    setInitialValues({ ...values, budgets: newBudgets });
  };

  const handleSubmitOnCreate = (values: CreateRecordValues) => {
    const newAmount = verifyAmountEndsPeriod(initialAmount.current);
    const amountToNumber = Number(newAmount);
    const newValues = {
      ...values,
      amount: amountToNumber,
      indebtedPeople,
      account: (selectedAccount?._id ?? ''),
      typeOfRecord: 'expense',
      // @TODO: Cambiar esto
      linkedBudgets: [],
    };

    if (isGuestUser) {
      createExpenseIncomeLocalStorage(newValues);
      return;
    }
    createExpense(newValues);
  };

  const handleSubmitOnEdit = (values: CreateRecordValues) => {
    // Flag to know if amount has a different value from the initial value. If so, the query to update account amount will be executed.
    let amountTouched = false;
    if (recordToBeEdited?.amount !== Number(initialAmount.current)) {
      amountTouched = true;
    }

    const newAmount = verifyAmountEndsPeriod(initialAmount.current);
    const amountToNumber = Number(newAmount);

    const newValues = {
      ...values,
      amount: amountToNumber,
      indebtedPeople,
      account: selectedAccount?._id ?? '',
      typeOfRecord: 'expense',
      // @TODO: Cambiar esto
      linkedBudgets: [],
    };

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
  };

  const handleSubmit = edit ? handleSubmitOnEdit : handleSubmitOnCreate;

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
              { (isCredit && typeOfRecord === 'expense') && (
              <FormControlLabel
                control={(
                  <Field
                    type="checkbox"
                    checked={values.isPaid}
                    label="Transaction paid (Optional)"
                    name="isPaid"
                    component={Switch}
                  />
              )}
                label="Transaction paid"
              />
              ) }
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
              { (budgetsAvailable.length === 0) && (
                <NoBudgetsCreatedForRecords />
              )}
              { (budgetsAvailable.length > 0) && (
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

export { ExpenseTemplate };
