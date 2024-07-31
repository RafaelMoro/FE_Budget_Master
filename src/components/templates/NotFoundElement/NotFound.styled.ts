import styled from '@emotion/styled';
import { responsiveBreakpoints } from '../../../styles';

export const Container = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  display: flex;
  gap: 4rem;
  flex-direction: column;
  align-items: center;
`;

export const Picture = styled.picture`
  display: flex;
  justify-content: center;

  img {
    width: 20.9rem;
    height: 20.6rem;
    object-fit: contain;

    @media ${responsiveBreakpoints.desktop}{
      width: 28.9rem;
      height: 29.6rem;
    }
  }
`;
