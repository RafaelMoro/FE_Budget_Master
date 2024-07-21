import { BudgetContainer, ContentPlaceholder } from '../../Budget.styled';

const BudgetSkeleton = () => (
  <BudgetContainer data-testid="budget-loading-skeleton">
    <ContentPlaceholder isTwoColumns />
    <ContentPlaceholder isTwoColumns={false} />
    <ContentPlaceholder isTwoColumns={false} />
    <ContentPlaceholder isTwoColumns />
    <ContentPlaceholder isTwoColumns={false} />
    <ContentPlaceholder isTwoColumns={false} />
  </BudgetContainer>
);

export { BudgetSkeleton };
