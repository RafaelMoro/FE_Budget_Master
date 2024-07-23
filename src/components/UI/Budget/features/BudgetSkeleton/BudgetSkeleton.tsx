import { BudgetContainer, ContentPlaceholder } from '../../Budget.styled';

const BudgetSkeleton = () => (
  <BudgetContainer data-testid="budget-loading-skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <ContentPlaceholder isTwoColumns />
    <ContentPlaceholder isTwoColumns={false} />
    <ContentPlaceholder isTwoColumns={false} />
    <ContentPlaceholder isTwoColumns />
    <ContentPlaceholder isTwoColumns={false} />
    <ContentPlaceholder isTwoColumns={false} />
  </BudgetContainer>
);

export { BudgetSkeleton };
