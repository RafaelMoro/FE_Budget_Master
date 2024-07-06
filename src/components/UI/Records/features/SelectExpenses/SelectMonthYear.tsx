import { Formik } from 'formik';
import { SelectMonthYearValues } from '../../interface';
import { SelectMonthYearBox } from '../Features.styled';
import { SelectInput } from '../../../SelectInput';
import { MONTHS } from '../../../../../constants';
import { SecondaryButton } from '../../../../../styles';
import { AbbreviatedMonthsType, CompleteMonthsType, LazyFetchRecords } from '../../../../../globalInterface';
import { updateAbbreviatedMonth } from '../../../../../utils/DateUtils/date.utils';
import { useGuestUser } from '../../../../../hooks';

interface SelectMonthYearProps {
  fetchRecordsCb?: ({ newMonth, newYear, completeMonth }: LazyFetchRecords) => Promise<void> | void;
  isDashboard?: boolean;
  buttonText?: string;
  completeMonth: CompleteMonthsType;
  currentYear: string;
  yearsArray: string[];
}

const SelectMonthYear = ({
  completeMonth, currentYear, yearsArray, fetchRecordsCb, isDashboard = false, buttonText = 'Search expenses',
}: SelectMonthYearProps) => {
  const { isGuestUser } = useGuestUser();
  const handleSubmit = (values: SelectMonthYearValues) => {
    // If it fetches, fetch with the new month and year
    if (fetchRecordsCb) {
      const newMonth: AbbreviatedMonthsType = updateAbbreviatedMonth({ newMonth: values.month });
      fetchRecordsCb({ newMonth, newYear: values.year, completeMonth: values.month });
    }
  };

  return (
    <Formik
      initialValues={{ month: completeMonth, year: currentYear }}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ submitForm }) => (
        <SelectMonthYearBox isDashboard={isDashboard} isGuestUser={isGuestUser}>
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
          <SecondaryButton onClick={submitForm}>{buttonText}</SecondaryButton>
        </SelectMonthYearBox>
      )}
    </Formik>
  );
};

export { SelectMonthYear };
