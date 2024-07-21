import styled from '@emotion/styled';
import { AppColors } from '../../styles';

export const Main = styled.main`
  min-height: 100vh;
  background-color: ${AppColors.bgColorWhite};
`;

export const BudgetList = styled.section`
  padding: 0 2rem;
  width: 100%;
  max-width: 155rem;
  margin: 2rem auto 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
`;
