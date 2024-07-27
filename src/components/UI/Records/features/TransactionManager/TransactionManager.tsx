import { useState } from 'react';
import { Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { TypeOfRecord } from '../../../../../globalInterface';
import { DASHBOARD_ROUTE } from '../../../../../pages/RoutesConstants';
import { RecordTemplate } from '../RecordTemplate/RecordTemplate';
import { Transfer } from '../Transfer';
import { AppIcon } from '../../../Icons';
import { ToggleButton } from '../../../../../styles';
import { GoBackIconButton, RecordTemplateMain, ToggleButtonGroup } from '../RecordTemplate/RecordTemplate.styled';
import { isCategoryNotSelected } from '../../../../../redux/slices/Categories/categories.slice';
import { ExpenseTemplate } from '../ExpenseTemplate';

const TransactionManager = ({ edit = false }: { edit?: boolean }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const typeOfRecordState: TypeOfRecord | undefined = location?.state?.typeOfRecord;
  const accounts = useAppSelector((state) => state.accounts.accounts);
  const hasOnlyOneAccount = accounts?.length === 1;
  const [typeOfRecord, setTypeOfRecord] = useState<TypeOfRecord>(typeOfRecordState ?? 'expense');
  const action: string = edit ? 'Edit' : 'Create';

  const changeTypeOfRecord = (event: React.MouseEvent<HTMLElement>, newTypeOfRecord: TypeOfRecord) => {
    setTypeOfRecord(newTypeOfRecord);
  };

  const handleGoBack = () => {
    dispatch(isCategoryNotSelected());
    navigate(DASHBOARD_ROUTE);
  };

  return (
    <RecordTemplateMain>
      <GoBackIconButton aria-label="sign-out-button" onClick={handleGoBack}>
        <AppIcon icon="Close" />
      </GoBackIconButton>
      { (!edit) && (
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={typeOfRecord}
        onChange={changeTypeOfRecord}
        aria-label="Select type of record"
      >
        <ToggleButton value="expense">Expense</ToggleButton>
        <ToggleButton value="income">Income</ToggleButton>
        { (!hasOnlyOneAccount) && (<ToggleButton value="transfer">Transfer</ToggleButton>) }
      </ToggleButtonGroup>
      ) }
      <Typography variant="h3" align="center">
        {' '}
        { action }
        {' '}
        { typeOfRecord }
      </Typography>
      { (typeOfRecord === 'income') && (<RecordTemplate typeOfRecord={typeOfRecord} edit={edit} />) }
      { (typeOfRecord === 'expense') && (<ExpenseTemplate typeOfRecord={typeOfRecord} edit={edit} />)}
      {(typeOfRecord === 'transfer' && !hasOnlyOneAccount) && (
      <Transfer edit={edit} typeOfRecord={typeOfRecord} action={action} />
      )}
    </RecordTemplateMain>
  );
};

export { TransactionManager };
