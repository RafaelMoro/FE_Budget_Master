import styled from '@emotion/styled';
import { AppColors, PrimaryButton, responsiveBreakpoints } from '../../../styles';

export const Container = styled.article`
  padding: 2rem 0;
  background-color: ${AppColors.white};
  box-shadow: 0 .4rem .8rem rgba(0, 0, 0, 0.2);
  border-radius: 1.5rem;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  gap: 3rem;
`;

export const RecordContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ViewAllFirstButton = styled(PrimaryButton)`
  @media ${responsiveBreakpoints.tabletAndDesktop} {
    justify-self: end;
  }
`;
