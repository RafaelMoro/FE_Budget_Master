import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';

import { SelectFormikFieldProps } from '../../../globalInterface';

interface DatePickerValueProps {
  label: string;
  field: SelectFormikFieldProps;
  // To update the value of the form.
  setFieldValueCb: (fieldName: string, newDate: unknown) => void;
}

const DatePickerValue = ({ label, field, setFieldValueCb }: DatePickerValueProps) => {
  const { value, name } = field;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={(newValue) => setFieldValueCb(name, newValue)}
      />
    </LocalizationProvider>
  );
};

export { DatePickerValue };
