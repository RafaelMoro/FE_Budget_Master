import { Formik } from 'formik';
import { SelectMonthYearValues } from '../../interface';
import { SelectMonthYearBox } from '../Features.styled';
import { SelectInput } from '../../../SelectInput';
import { MONTHS } from '../../../../../constants';
import { SecondaryButton } from '../../../../../styles';
import { ABBREVIATED_MONTHS, CompleteMonthsType } from '../../../../../globalInterface';

interface SelectMonthYearProps {
  updateMonthYear: (values: SelectMonthYearValues) => void;
  fetchRecordsCb?: ({ newMonth, newYear }?: {
    newMonth?: string;
    newYear?: string;
  }) => Promise<void>;
  completeMonth: CompleteMonthsType;
  currentYear: string;
  yearsArray: string[];
}

const SelectMonthYear = ({
  updateMonthYear, completeMonth, currentYear, yearsArray, fetchRecordsCb,
}: SelectMonthYearProps) => {
  const handleSubmit = (values: SelectMonthYearValues) => {
    // TODO: check if this pattern is correct.
    //  TODO: The month and year states are updated later the fetch records, we may need to check select expenses as well
    // First update month and year
    updateMonthYear(values);
    // If it fetches, fetch with the new month and year
    if (fetchRecordsCb) {
      // TODO: Think if this is the best approach on formatting the month and if it's not responsability of useDate
      const monthIndex = MONTHS.indexOf(values.month);
      const newMonth = ABBREVIATED_MONTHS[monthIndex];
      fetchRecordsCb({ newMonth, newYear: values.year });
    }
  };
  return (
    <Formik
      initialValues={{ month: completeMonth, year: currentYear }}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ submitForm }) => (
        <SelectMonthYearBox>
          <SelectInput
            labelId="select-month"
            dataTestId="select-month"
            labelName="Month"
            fieldName="month"
            stringOptions={MONTHS}
            colorOptions={[]}
          />
          <SelectInput
            labelId="select-year"
            dataTestId="select-year"
            labelName="Year"
            fieldName="year"
            stringOptions={yearsArray}
            colorOptions={[]}
          />
          <SecondaryButton onClick={submitForm}>Search expenses</SecondaryButton>
        </SelectMonthYearBox>
      )}
    </Formik>
  );
};

export { SelectMonthYear };
