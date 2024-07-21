/* eslint-disable no-console */
import { useAppSelector } from '../../../../../redux/hooks';
import { useFetchBudgetsQuery } from '../../../../../redux/slices/Budgets/budgets.api';
import { BudgetListContainer } from '../../../../../pages/Budgets/BudgetsPage.styled';
import { Budget } from '../../Budget';
import { Error } from '../../../Error';
import { ERROR_MESSAGE_GENERAL } from '../../../../../constants';
import { BudgetSkeleton } from '../BudgetSkeleton';
import { ErrorContainer } from '../../Budget.styled';
import { NotElementFound } from '../../../../templates/NotFoundElement';

const BudgetList = () => {
  const user = useAppSelector((state) => state.user);
  const bearerToken = user.userInfo?.bearerToken as string;
  const windowSize = useAppSelector((state) => state.userInterface.windowSize);
  const isMobile = windowSize === 'Mobile';
  const { data, isError, isLoading } = useFetchBudgetsQuery({ bearerToken }, { skip: !bearerToken });

  if (isError) {
    return (
      <ErrorContainer>
        <Error description={ERROR_MESSAGE_GENERAL} />
      </ErrorContainer>
    );
  }

  if (data && data.length === 0) {
    return (
      <NotElementFound
        description="You have not created budgets yet. Start now!"
        buttonText="Create budget"
        onClickCb={() => console.log('Create budget')}
      />
    );
  }

  return (
    <BudgetListContainer>
      { (isLoading && isMobile) && <BudgetSkeleton /> }
      { (isLoading && !isMobile) && (
        <>
          <BudgetSkeleton />
          <BudgetSkeleton />
        </>
      ) }
      { (data && data.length > 0) && data.map((budget) => (
        <Budget key={budget._id} budget={budget} />
      )) }
    </BudgetListContainer>
  );
};

export { BudgetList };
