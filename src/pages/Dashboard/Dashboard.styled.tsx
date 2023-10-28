import styled from '@emotion/styled';
import { RecordBoxProps } from './interface';

export const DashboardContainer = styled.div`
  height: 100vh;
  position: relative;
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 30rem 1fr;
    grid-template-rows: 11.3rem 1fr;
  }
`;

export const RecordsBox = styled('main', { shouldForwardProp: (props) => props !== 'noAccountsCreated' })`
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  @media (min-width: 480px) {
    grid-column: 1 / 3;
    padding: 2rem 2rem 0 2rem;
  }
  @media (min-width: 1024px) {
    grid-column: 2 / 3;
    ${({ noAccountsCreated }: RecordBoxProps) => (noAccountsCreated && 'grid-column: 1 / 3;')}
    overflow-y: scroll;
    overscroll-behavior-y: contain;
  }
`;
