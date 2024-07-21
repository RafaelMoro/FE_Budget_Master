/* eslint-disable no-console */
import { useAppSelector } from '../../../../../redux/hooks';
import { useFetchBudgetsQuery } from '../../../../../redux/slices/Budgets/budgets.api';
import { BudgetListContainer } from '../../../../../pages/Budgets/BudgetsPage.styled';
import { Budget } from '../../Budget';
import { currentBudget, periodicBudget } from '../../Budget.mocks';

const BudgetList = () => {
  const user = useAppSelector((state) => state.user);
  const bearerToken = user.userInfo?.bearerToken as string;
  const { data, isError, isFetching } = useFetchBudgetsQuery({ bearerToken }, { skip: !bearerToken });
  console.log('data:', data);
  console.log('isError:', isError);
  console.log('isFetching:', isFetching);

  return (
    <BudgetListContainer>
      <Budget budget={currentBudget} />
      <Budget budget={periodicBudget} />
    </BudgetListContainer>
  );
};

export { BudgetList };
