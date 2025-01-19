/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import {
  Dialog, IconButton,
} from '@mui/material';
import { Field, Formik } from 'formik';

import { ERROR_MESSAGE_GENERAL } from '../../../../../constants';
import { TYPE_OF_ACCOUNTS } from '../../../../../globalInterface';
import { SystemStateEnum } from '../../../../../enums';
import { useAppSelector } from '../../../../../redux/hooks';
import { CreateAccountMutationProps, ModifyAccountMutationProps } from '../../../../../redux/slices/Accounts/interface';
import { useNotification } from '../../../../../hooks/useNotification';
import { useCurrencyField } from '../../../../Other/CurrencyField/useCurrencyField';
import { CreateAccountSchema } from '../../../../../validationsSchemas';
import {
  CreateAccount, AccountDialogProps, AccountUI, ModifyAccountValues, ModifyAccountInitialValues, CreateAccountInitialValues,
} from '../../Account.interface';
import { SelectInput } from '../../../SelectInput';
import { AppIcon } from '../../../Icons';
import {
  DialogTitle, InputForm, PrimaryButton, FlexContainer,
} from '../../../../../styles';
import { AccountDialogFormContainer } from '../../Account.styled';
import { LoadingSpinner } from '../../../LoadingSpinner';
import { CurrencyField } from '../../../../Other';
import { useCreateAccountMutation, useModifyAccountMutation } from '../../../../../redux/slices/Accounts/actions';
import { useGuestUser } from '../../../../../hooks/useGuestUser/useGuestUser';
import { useAccount } from '../../../../../hooks/useAccount';

const initialValuesCreateAccount: CreateAccountInitialValues = {
  title: '',
  accountType: 'Débito',
  amount: '',
  backgroundColor: 'Dark Orange',
};

const AccountDialog = ({
  open,
  onClose,
  accountAction,
  account,
}: AccountDialogProps) => {
  const { isGuestUser } = useGuestUser();
  const { createAccountGuestUser, editAccountGuestUser } = useAccount();
  const { updateAmount, initialAmount } = useCurrencyField();
  const [createAccountMutation, { isLoading: isLoadingCreateAccount }] = useCreateAccountMutation();
  const [modifyAccountMutation, { isLoading: isLoadingModifyAccount }] = useModifyAccountMutation();
  const disableSubmitButton = isLoadingCreateAccount || isLoadingModifyAccount;
  const { updateGlobalNotification } = useNotification();
  const userReduxState = useAppSelector((state) => state.user);
  const bearerToken = userReduxState.userInfo?.bearerToken as string;

  // Copying constant because it is readyonly
  const typeAccounts = [...TYPE_OF_ACCOUNTS];
  const titleModal = accountAction === 'Create' ? 'Crear cuenta:' : 'Modificar cuenta:';
  const buttonModalText = accountAction === 'Create' ? 'Crear' : 'Modificar';

  // Transforming amount from account to string;
  const accountToBeModified = useMemo(() => {
    const amount = account?.amount ?? 0;
    const amountString = String(amount);
    const newAccount: ModifyAccountInitialValues = { ...account as AccountUI, amount: amountString };
    return newAccount;
  }, [account]);

  const initialValues = accountAction === 'Create' ? initialValuesCreateAccount : accountToBeModified;

  const createAccount = async (values: CreateAccountInitialValues) => {
    try {
      // Transform amount to number as it comes as string.
      const amountNumber = Number(initialAmount.current);
      // Leaving default color black as the prop is still needed to create an account.
      const createAccountValues: CreateAccount = { ...values, amount: amountNumber, color: 'black' };
      const createAccountMutationProps: CreateAccountMutationProps = { values: createAccountValues, bearerToken };

      if (isGuestUser) {
        createAccountGuestUser(createAccountValues);
        onClose();
        return;
      }

      await createAccountMutation(createAccountMutationProps).unwrap();
      onClose();
    } catch (err) {
      updateGlobalNotification({
        newTitle: 'Error al crear su cuenta',
        newDescription: ERROR_MESSAGE_GENERAL,
        newStatus: SystemStateEnum.Error,
      });
      onClose();
    }
  };

  const modifyAccount = async (values: any) => {
    try {
      // Excluding version, accountUI props and changing _id for accountId
      const {
        __v: version, sub, selected, backgroundColorUI, colorUI, amountFormatted, amount, _id: accountId, ...rest
      } = values;
      const newAmount = initialAmount.current !== '' ? initialAmount.current : amount;
      const amountNumber = Number(newAmount);
      const accountModifiedValues: ModifyAccountValues = { ...rest, accountId, amount: amountNumber };

      if (isGuestUser) {
        editAccountGuestUser(accountModifiedValues);
        // Show success notification
        updateGlobalNotification({
          newTitle: `Account ${accountModifiedValues.title} updated`,
          newDescription: '',
          newStatus: SystemStateEnum.Success,
        });
        onClose(); return;
      }
      const modifyAccountMutationProps: ModifyAccountMutationProps = { values: accountModifiedValues, bearerToken };
      await modifyAccountMutation(modifyAccountMutationProps);

      onClose();
    } catch (err) {
      updateGlobalNotification({
        newTitle: 'Error al modificar su cuenta',
        newDescription: ERROR_MESSAGE_GENERAL,
        newStatus: SystemStateEnum.Error,
      });
      onClose();
    }
  };

  const handleSubmit = accountAction === 'Create' ? createAccount : modifyAccount;

  return (
    <Dialog onClose={onClose} open={open}>
      <>
        <FlexContainer justifyContent="spaceBetween" alignItems="center" padding={2}>
          <DialogTitle>{ titleModal }</DialogTitle>
          <IconButton onClick={onClose}>
            <AppIcon icon="Close" />
          </IconButton>
        </FlexContainer>
        <Formik
          initialValues={initialValues}
          validationSchema={CreateAccountSchema}
          onSubmit={(values) => handleSubmit(values)}
          validateOnMount
        >
          {({ submitForm, setFieldValue }) => (
            <AccountDialogFormContainer>
              <Field
                component={InputForm}
                name="title"
                type="text"
                variant="standard"
                label="Título de la cuenta"
              />
              <CurrencyField setFieldValue={setFieldValue} amount={initialAmount.current} updateAmount={updateAmount} />
              <SelectInput
                dataTestId="select-account-type"
                labelId="select-account-type"
                labelName="Tipo de cuenta"
                fieldName="accountType"
                stringOptions={typeAccounts}
                colorOptions={[]}
              />
              <PrimaryButton disabled={disableSubmitButton} variant="contained" onClick={submitForm} size="medium">
                { (isLoadingCreateAccount || isLoadingModifyAccount) ? (<LoadingSpinner />) : buttonModalText }
              </PrimaryButton>
            </AccountDialogFormContainer>
          )}
        </Formik>
      </>
    </Dialog>
  );
};

export { AccountDialog };
