import styled from '@emotion/styled';
import {
  IconButton, Toolbar, Typography, ToggleButtonGroup as ToggleButtonGroupMUI,
} from '@mui/material';

import { Form } from 'formik';
import {
  AppColors, SecondaryButton, TableCell, responsiveBreakpoints,
} from '../../../../styles';
import { appTheme } from '../../../../styles/theme';
import { SelectExpensesCellProps, SelectMonthYearBoxProps } from '../interface';

/** SelectExpenses */
export const SelectExpensesContainer = styled.div`
  padding: 3rem 1rem 1rem 1rem;
  display: grid;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  min-width: 32rem;

  @media ${responsiveBreakpoints.tablet}{
    min-width: 48rem;
  }

  @media ${responsiveBreakpoints.desktop} {
    min-width: 70rem;
  }
`;

export const CloseDrawerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

export const LoadingExpensesContainer = styled.div`
  width: 100%;
  min-width: 32rem;
  display: grid;
  gap: 1rem;
  place-items: center;
  padding-top: 3rem;

  @media ${responsiveBreakpoints.tablet} {
    min-width: 68.4rem;
  }

  @media ${responsiveBreakpoints.desktop} {
    min-width: 77rem;
  }
`;

export const ExpensesNotFoundContainer = styled.div`
  padding-top: 3rem;

  @media ${responsiveBreakpoints.tablet} {
    min-width: 68.4rem;
  }

  @media ${responsiveBreakpoints.desktop} {
    min-width: 77rem;
  }
`;

export const SelectExpensesToolbar = styled(Toolbar)`
  padding: 2rem 0;
  display: grid;
  gap: 1rem;
`;

/** SelectExpensesTable */
export const SelectMonthYearBox = styled('div', { shouldForwardProp: (prop) => prop !== 'isDashboard' && prop !== 'isGuestUser' })`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0 1rem;

  @media ${responsiveBreakpoints.tabletAndDesktop} {
    flex-direction: row;
    justify-content: center;
    gap: 5rem;
    margin-top: 2rem;
    ${({ isDashboard, isGuestUser }: SelectMonthYearBoxProps) => ((isDashboard && isGuestUser) && 'margin-bottom: 5rem;')}
    ${({ isDashboard, isGuestUser }: SelectMonthYearBoxProps) => ((isDashboard && !isGuestUser) && 'margin: 0 0 2rem 0')}
  }
`;

export const SelectExpensesCell = styled(TableCell, { shouldForwardProp: (props) => props !== 'noHorizontalPadding' })`
  padding: ${({ noHorizontalPadding }: SelectExpensesCellProps) => (noHorizontalPadding ? '1.5rem 0' : '1.5rem 1rem 1.5rem 0')};
`;

/** MonthRecords */
export const ShowTotalContianer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2rem;
`;

/** ShowIndebtedPeople */

export const DebtPaid = styled(TableCell)`
  color: ${AppColors.subtitleColor};
  text-decoration: line-through;
`;

export const NameCellTitle = styled(TableCell)`
  padding: 1.6rem 0;
  text-align: center;
`;

export const IndebtedTableCell = styled(TableCell)`
  padding: ${appTheme.spacing(1)} 0;
`;

export const NameCell = styled(TableCell)`
  padding: 1.6rem 0;
  display: grid;
  gap: 1rem;
`;

export const IndebtedPeopleName = styled(Typography)`
  padding: 1rem 0;
  text-align: center;
`;

export const IconsCell = styled(TableCell)`
  display: flex;
`;

export const IndebtedPersonName = styled(Typography)`
  grid-column: 1 / 3;
  text-align: center;
`;

/** No records found */

export const NoRecordsFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  padding-top: 4rem;
`;

/** Expense and Income Template */
export const ShowIndebtedPeopleContainer = styled.div`
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const SecondaryButtonForm = styled(SecondaryButton)`
  min-width: 18rem;
`;

export const FormContainer = styled(Form)`
  display: grid;
  padding: 0 1rem 0 1rem;
  gap: 2rem;
`;

/** Chips */
export const ChipForm = styled.div`
  display: grid;
  gap: 3rem;
  margin: 2rem 0;
`;

export const ChipsContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(min-content, 20%));
  justify-content: center;
  gap: 1rem;
`;

export const AddChipButtonContainer = styled.div`
  margin: 0 auto;
`;

/** Transaction manager */
export const GoBackIconButton = styled(IconButton)`
  color: ${AppColors.grey};
  justify-self: end;
`;

export const TransactionManagerMain = styled.main`
  display: grid;
  padding: 1rem;
  gap: 1rem;
  max-width: 90rem;
  margin: 0 auto;
`;

export const ToggleButtonGroup = styled(ToggleButtonGroupMUI)`
  justify-self: center;
`;
