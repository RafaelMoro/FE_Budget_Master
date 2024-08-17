import styled from '@emotion/styled';

export const GraphicsCardContainer = styled.article`
  width: 100%;
  padding-top: 2rem;
  padding-bottom: 2rem;
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
  gap: 2rem;
`;

export const NoRecordsGraphicsCardContainer = styled(GraphicsCardContainer)`
  padding: 4rem 2rem;
`;
