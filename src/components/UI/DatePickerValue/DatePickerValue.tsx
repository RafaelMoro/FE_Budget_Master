import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, pickersLayoutClasses } from '@mui/x-date-pickers';

import { SelectFormikFieldProps } from '../../../globalInterface';
import { globalConfiguration } from '../../../styles';

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
        slotProps={{
          layout: {
            sx: {
              [`& .${pickersLayoutClasses.toolbar} > span`]: {
                fontSize: globalConfiguration.mobile.fontSizes.P,
              },
              '& .MuiDateTimePickerTabs-root .MuiSvgIcon-root': {
                fontSize: '2rem',
              },
              // Time picker hour size
              '& .MuiTimeClock-root': {
                fontSize: globalConfiguration.mobile.fontSizes.P,
              },
              // Days of the week
              '& .MuiDayCalendar-header > span': {
                fontSize: globalConfiguration.mobile.fontSizes.P,
              },
              // Button to change year.
              '& .MuiPickersYear-root > button': {
                fontSize: globalConfiguration.mobile.fontSizes.P,
              },
              '& .MuiDateTimePickerToolbar-dateContainer > button > span': {
                fontSize: globalConfiguration.mobile.fontSizes.H4,
              },
              '& .MuiDateTimePickerToolbar-timeContainer .MuiPickersToolbarText-root': {
                fontSize: globalConfiguration.mobile.fontSizes.P,
              },
              '& .MuiDateTimePickerToolbar-timeContainer .MuiDateTimePickerToolbar-separator': {
                fontSize: globalConfiguration.mobile.fontSizes.P,
              },
              '& .MuiDateTimePickerToolbar-timeDigitsContainer': {
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gridTemplateRows: '1fr',
                placeItems: 'center',
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export { DatePickerValue };
