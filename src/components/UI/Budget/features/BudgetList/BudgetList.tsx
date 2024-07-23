/* eslint-disable no-console */
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAppSelector } from '../../../../../redux/hooks';
import { useFetchBudgetsQuery } from '../../../../../redux/slices/Budgets/budgets.api';
import { BudgetListContainer } from '../../../../../pages/Budgets/BudgetsPage.styled';
import { Budget } from '../../Budget';
import { Error } from '../../../Error';
import { ERROR_MESSAGE_GENERAL } from '../../../../../constants';
import { BudgetSkeleton } from '../BudgetSkeleton';
import { BudgetsTitle, CreateBudgetButton, ErrorContainer } from '../../Budget.styled';
import { NotElementFound } from '../../../../templates/NotFoundElement';
import { CREATE_BUDGET_ROUTE } from '../../../../../pages/RoutesConstants';

const BudgetList = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const bearerToken = user.userInfo?.bearerToken as string;
  const windowSize = useAppSelector((state) => state.userInterface.windowSize);
  const isMobile = windowSize === 'Mobile';
  const { data, isError, isLoading } = useFetchBudgetsQuery({ bearerToken }, { skip: !bearerToken });

  const navigateCreateBudget = () => navigate(CREATE_BUDGET_ROUTE);

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
        description="Start your journey to financial freedom. Set up your budget now!"
        buttonText="Create budget"
        onClickCb={navigateCreateBudget}
      />
    );
  }

  return (
    <AnimatePresence>
      <BudgetListContainer>
        <BudgetsTitle variant="h3" align="center">Budgets:</BudgetsTitle>
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
        <CreateBudgetButton onClick={navigateCreateBudget}>Create budget</CreateBudgetButton>
      </BudgetListContainer>
    </AnimatePresence>
  );
};

export { BudgetList };
