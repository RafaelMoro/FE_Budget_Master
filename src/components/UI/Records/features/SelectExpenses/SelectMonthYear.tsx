import { Formik } from 'formik';
import { SelectMonthYearValues } from '../../interface';
import { SelectMonthYearBox } from '../Features.styled';
import { SelectInput } from '../../../SelectInput';
import { MONTHS } from '../../../../../constants';
import { SecondaryButton } from '../../../../../styles';
import { CompleteMonthsType, LazyFetchRecords } from '../../../../../globalInterface';
import { updateAbbreviatedMonth } from '../../../../../utils/DateUtils/date.utils';

interface SelectMonthYearProps {
  fetchRecordsCb?: ({ newMonth, newYear }: LazyFetchRecords) => Promise<void>;
  completeMonth: CompleteMonthsType;
  currentYear: string;
  yearsArray: string[];
}

const SelectMonthYear = ({
  completeMonth, currentYear, yearsArray, fetchRecordsCb,
}: SelectMonthYearProps) => {
  const handleSubmit = (values: SelectMonthYearValues) => {
    // If it fetches, fetch with the new month and year
    if (fetchRecordsCb) {
      const newMonth = updateAbbreviatedMonth({ newMonth: values.month });
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
