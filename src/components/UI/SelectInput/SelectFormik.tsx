/* eslint-disable no-console */
import { SelectChangeEvent } from '@mui/material';

import { Select } from '../../../styles';
import { SelectFormikProps } from '../../../globalInterface';

const SelectFormik = ({
  children, form, field, dataTestId, disabled = false, onClickCb,
}: SelectFormikProps) => {
  const { name, value } = field;
  const { setFieldValue } = form;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: SelectChangeEvent<any>) => {
    setFieldValue(name, event.target.value);
    if (onClickCb) onClickCb();
  };

  return (
    <Select
      name={name}
      value={value}
      onChange={handleChange}
      data-testid={dataTestId}
      disabled={disabled}
    >
      { children }
    </Select>
  );
};

export { SelectFormik };
