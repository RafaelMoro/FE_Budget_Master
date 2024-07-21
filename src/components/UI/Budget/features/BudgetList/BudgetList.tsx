/* eslint-disable no-console */
import { useAppSelector } from '../../../../../redux/hooks';
import { useFetchBudgetsQuery } from '../../../../../redux/slices/Budgets/budgets.api';
import { BudgetListContainer } from '../../../../../pages/Budgets/BudgetsPage.styled';
import { Budget } from '../../Budget';
import { Error } from '../../../Error';
import { ERROR_MESSAGE_GENERAL } from '../../../../../constants';
import { BudgetSkeleton } from '../BudgetSkeleton';

const BudgetList = () => {
  const user = useAppSelector((state) => state.user);
  const bearerToken = user.userInfo?.bearerToken as string;
  const { data, isError, isLoading } = useFetchBudgetsQuery({ bearerToken }, { skip: !bearerToken });

  if (isError) {
    return (
      <Error description={ERROR_MESSAGE_GENERAL} />
    );
  }

  return (
    <BudgetListContainer>
      { (isLoading) && <BudgetSkeleton /> }
      { (data && data.length > 0) && data.map((budget) => (
        <Budget key={budget._id} budget={budget} />
      )) }
    </BudgetListContainer>
  );
};

export { BudgetList };
