/* eslint-disable no-console */
import { ReactNode, useEffect } from 'react';
import { SelectChangeEvent } from '@mui/material';

import { Select } from '../../../styles';
import { SelectFormikProps } from './interface';

const SelectFormik = ({
  children, form, field, processSelectDataFn, disabled = false,
}: SelectFormikProps) => {
  const { name, value } = field;
  const { setFieldValue } = form;

  useEffect(() => {
    // This callback is to do any action depending of the name and value from the select field.
    if (processSelectDataFn) processSelectDataFn(name, value);
  }, [processSelectDataFn, name, value]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: SelectChangeEvent<any>) => setFieldValue(name, event.target.value);

  return (
    <Select
      name={name}
      value={value}
      onChange={handleChange}
      disabled={disabled}
    >
      { children }
    </Select>
  );
};

interface SelectFormikFieldProps {
  name: string;
  value: string;
}

interface SelectFormikFormProps {
  setFieldValue: (name: string, value: string) => void;
}

interface SelectDestinationAccountProps {
  children: ReactNode;
  field: SelectFormikFieldProps;
  form: SelectFormikFormProps;
  selectOriginAccount: (value: string) => void
}

const SelectOriginAccount = ({
  children, field, form, selectOriginAccount,
}: SelectDestinationAccountProps) => {
  const { name, value } = field;
  const { setFieldValue } = form;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: SelectChangeEvent<any>) => {
    selectOriginAccount(event.target.value);
    setFieldValue('destinationAccount', '');
    setFieldValue(name, event.target.value);
  };

  return (
    <Select
      name={name}
      value={value}
      onChange={handleChange}
    >
      { children }
    </Select>
  );
};

export { SelectFormik, SelectOriginAccount };
