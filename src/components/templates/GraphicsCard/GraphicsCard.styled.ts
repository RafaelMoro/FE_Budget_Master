import styled from '@emotion/styled';
import { AppColors } from '../../../styles';

export const GraphicsCardContainer = styled.article`
  width: 100%;
  padding-top: 2rem;
  padding-bottom: 2rem;
  background-color: ${AppColors.white};
  box-shadow: 0 .4rem .8rem rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 1.5rem;
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
  gap: 2rem;
`;
